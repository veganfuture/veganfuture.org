import {
  DynamoDBClient,
  GetItemCommand,
  UpdateItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = process.env.TABLE_NAME;
const TOKEN_GSI = process.env.TOKEN_GSI || "token-index";

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const html = (statusCode, markup) => ({
  statusCode,
  headers: {
    "Content-Type": "text/html; charset=utf-8",
  },
  body: markup,
});

const redirect = (location, statusCode = 303) => ({
  statusCode,
  headers: { Location: location },
  body: "",
});

function escapeHtml(s = "") {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}

// Build absolute URL for form action, including stage if present.
function buildBaseUrl(event) {
  const proto =
    event.headers?.["x-forwarded-proto"] ||
    event.headers?.["X-Forwarded-Proto"] ||
    "https";
  const host = event.headers?.host || event.requestContext?.domainName;
  const stage = event.requestContext?.stage;
  const basePath = stage && stage !== "$default" ? `/${stage}` : "";
  return `${proto}://${host}${basePath}`;
}

async function unsubscribeByEmail(email) {
  if (!email) return { ok: false, notFound: false, msg: "Email required." };

  const get = await client.send(
    new GetItemCommand({
      TableName: TABLE_NAME,
      Key: { email: { S: email } },
      ProjectionExpression: "email, canEmailUpdates",
    }),
  );

  if (!get.Item)
    return {
      ok: false,
      notFound: true,
      msg: "No subscription found for that email.",
    };

  await client.send(
    new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: { email: { S: email } },
      UpdateExpression: "SET canEmailUpdates = :f",
      ExpressionAttributeValues: { ":f": { BOOL: false } },
    }),
  );

  return { ok: true, email };
}

async function unsubscribeByToken(token) {
  if (!token) return { ok: false, notFound: false, msg: "Token required." };

  const q = await client.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: TOKEN_GSI,
      KeyConditionExpression: "#t = :tok",
      ExpressionAttributeNames: { "#t": "token" },
      ExpressionAttributeValues: { ":tok": { S: token } },
      Limit: 1,
    }),
  );

  const item = q.Items && q.Items[0];
  if (!item)
    return { ok: false, notFound: true, msg: "Invalid or expired link." };

  const email = item.email.S;

  await client.send(
    new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: { email: { S: email } },
      UpdateExpression: "SET canEmailUpdates = :f",
      ExpressionAttributeValues: { ":f": { BOOL: false } },
    }),
  );

  return { ok: true, email };
}

function renderConfirmPage({ actionUrl, token, email }) {
  const hasToken = !!token;
  const intro = hasToken
    ? `<p>Confirm you want to unsubscribe <strong>${escapeHtml(email || "")}</strong> from future emails.</p>`
    : `<p>Enter your email to unsubscribe from future emails.</p>`;

  const tokenField = hasToken
    ? `<input type="hidden" name="token" value="${escapeHtml(token)}">`
    : "";

  const emailField = hasToken
    ? ""
    : `<label style="display:block;margin:12px 0 6px">Email address</label>
       <input name="email" type="email" required placeholder="you@example.com" style="padding:8px;width:100%;max-width:360px">`;

  return `
  <!doctype html>
  <meta charset="utf-8">
  <title>Unsubscribe</title>
  <div style="font:16px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:40px auto;padding:24px;border:1px solid #ddd;border-radius:12px">
    <h1 style="margin:0 0 12px">Unsubscribe</h1>
    ${intro}
    <form method="post" action="${escapeHtml(actionUrl)}" style="margin-top:16px">
      ${tokenField}
      ${emailField}
      <button type="submit" style="margin-top:16px;padding:10px 14px;border:0;border-radius:8px;background:#111;color:#fff;cursor:pointer">
        Confirm unsubscribe
      </button>
    </form>
  </div>
  `;
}

function parseFormUrlEncoded(body) {
  const out = {};
  if (!body) return out;
  for (const part of body.split("&")) {
    if (!part) continue;
    const [k, v = ""] = part.split("=");
    const key = decodeURIComponent(k.replace(/\+/g, " "));
    const val = decodeURIComponent(v.replace(/\+/g, " "));
    out[key] = val;
  }
  return out;
}

function looksLikeJson(raw) {
  if (!raw) return false;
  const t = raw.trim();
  return t.startsWith("{") || t.startsWith("[");
}

export const handler = async (event) => {
  try {
    const method = (
      event.requestContext?.http?.method ||
      event.httpMethod ||
      "GET"
    ).toUpperCase();
    const qs = event.queryStringParameters || {};
    const baseUrl = buildBaseUrl(event);
    const postUrl = `${baseUrl}/unsubscribe_raaf`;

    if (method === "GET") {
      const token = qs.token?.trim();
      const email = qs.email?.trim()?.toLowerCase();

      // If a token is present, we *display* a confirm form that will POST the token.
      // (We do not flip canEmailUpdates here, because email clients may follow this
      // link automatically)
      const markup = renderConfirmPage({ actionUrl: postUrl, token, email });
      return html(200, markup);
    }

    if (method === "POST") {
      // Decode raw body first
      const rawHeader =
        event.headers?.["content-type"] ||
        event.headers?.["Content-Type"] ||
        "";
      const contentType = rawHeader.toLowerCase();

      let rawBody = event.body || "";
      if (event.isBase64Encoded) {
        rawBody = Buffer.from(rawBody, "base64").toString("utf8");
      }

      // Guard against multipart (not supported here)
      if (contentType.startsWith("multipart/form-data")) {
        return json(415, {
          ok: false,
          error:
            "multipart/form-data not supported; use application/x-www-form-urlencoded or JSON.",
        });
      }

      // Accept either JSON or form-urlencoded; enforce XOR (token XOR email)
      const isFormByHeader = contentType.startsWith(
        "application/x-www-form-urlencoded",
      );
      const isJsonByHeader = contentType.includes("application/json");
      const isFormByShape = !looksLikeJson(rawBody) && rawBody.includes("=");

      let body = {};
      try {
        if (isFormByHeader || (!isJsonByHeader && isFormByShape)) {
          body = parseFormUrlEncoded(rawBody);
        } else if (isJsonByHeader || looksLikeJson(rawBody)) {
          body = JSON.parse(rawBody);
        } else {
          // Last resort: try form, then JSON
          body = parseFormUrlEncoded(rawBody);
          if (!Object.keys(body).length) body = JSON.parse(rawBody);
        }
      } catch {
        return json(400, { ok: false, error: "Invalid request body" });
      }

      const token = body.token?.trim?.();
      const email = body.email?.trim?.()?.toLowerCase?.();

      const hasToken = !!token;
      const hasEmail = !!email;

      if ((hasToken && hasEmail) || (!hasToken && !hasEmail)) {
        return json(400, {
          ok: false,
          error: `Provide either 'token' or 'email' (but not both). Got token: ${hasToken}, email: ${hasEmail} with values token='${escapeHtml(token)}', email='${escapeHtml(email)}'`,
        });
      }

      const result = hasToken
        ? await unsubscribeByToken(token)
        : await unsubscribeByEmail(email);

      if (!result.ok) {
        const code = result.notFound ? 404 : 400;
        console.log(
          `Unsubscribe for ${hasToken ? `token: ${token}` : `email: ${email}`} failed: ${result}`,
        );

        if (result.notFound) {
          // For privacy, don’t reveal whether an email is in the list or not if
          // they used the email form. Only the token link proves they got a
          // valid link.
          if (hasEmail) {
            return json(404, {
              ok: false,
              error: "No subscription found for that email.",
            });
          } else {
            return json(400, {
              ok: false,
              error: result.msg || "Invalid or expired link.",
            });
          }
        } else {
          return json(code, {
            ok: false,
            error: result.msg || "Unable to unsubscribe.",
          });
        }
      }

      // Return a friendly HTML if the caller was a browser form; otherwise JSON.
      const wantsHtml =
        contentType.includes("application/x-www-form-urlencoded") ||
        (event.headers?.accept || "").toLowerCase().includes("text/html");

      if (wantsHtml) {
        const markup = `
          <!doctype html>
          <meta charset="utf-8">
          <title>Unsubscribed</title>
          <div style="font:16px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:40px auto;padding:24px;border:1px solid #ddd;border-radius:12px">
            <h1 style="margin:0 0 12px">You're unsubscribed</h1>
            <p>${escapeHtml(result.email)} will no longer receive email updates.</p>
          </div>`;
        return html(200, markup);
      }

      return json(200, {
        ok: true,
        email: result.email,
        status: "unsubscribed",
      });
    }

    return json(405, { ok: false, error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return json(500, { ok: false, error: "Internal server error" });
  }
};
