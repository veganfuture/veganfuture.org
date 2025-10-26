// Node.js 18+
// Fetch the newest YouTube video for a channel using the public RSS feed.

const CHANNEL_ID = process.env.YT_CHANNEL_ID;

// Allowed origins must match your HttpApi CORS settings
const ALLOWED_ORIGINS = new Set([
  "https://veganfuture.org",
  "http://localhost:3000",
]);

function corsHeaders(event) {
  const requestOrigin =
    event?.headers?.origin ||
    event?.headers?.Origin ||
    event?.headers?.ORIGIN;

  const headers = {
    "Content-Type": "application/json",
  };

  if (requestOrigin && ALLOWED_ORIGINS.has(requestOrigin)) {
    headers["Access-Control-Allow-Origin"] = requestOrigin;
    headers["Vary"] = "Origin";
  }
  return headers;
}

const feedUrlForChannel = (id) =>
  `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(id)}`;

exports.handler = async (event) => {
  const baseHeaders = corsHeaders(event);

  try {
    if (!CHANNEL_ID) {
      console.error("Missing env var YT_CHANNEL_ID");
      return {
        statusCode: 500,
        headers: baseHeaders,
        body: JSON.stringify({ error: "Server misconfigured: YT_CHANNEL_ID not set" }),
      };
    }

    const url = feedUrlForChannel(CHANNEL_ID);
    let res;
    try {
      res = await fetch(url, {
        method: "GET",
        headers: {
          // A UA helps some endpoints; harmless otherwise
          "User-Agent": "LatestYouTubeLambda/1.0 (+https://veganfuture.org)",
          "Accept": "application/atom+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });
    } catch (netErr) {
      console.error("Network error fetching feed:", netErr);
      return {
        statusCode: 502,
        headers: baseHeaders,
        body: JSON.stringify({ error: "Upstream fetch failed", detail: String(netErr) }),
      };
    }

    const text = await res.text();

    if (!res.ok) {
      console.error("Non-OK feed response", { status: res.status, text: text?.slice(0, 500) });
      return {
        statusCode: 502,
        headers: baseHeaders,
        body: JSON.stringify({ error: `Feed returned ${res.status}`, body: text?.slice(0, 4000) }),
      };
    }

    // Parse only the first <entry> block
    const entryStart = text.indexOf("<entry>");
    const entryEnd = text.indexOf("</entry>", entryStart);
    if (entryStart === -1 || entryEnd === -1) {
      console.error("No <entry> found in feed");
      return {
        statusCode: 404,
        headers: baseHeaders,
        body: JSON.stringify({ error: "No videos found in the channel feed" }),
      };
    }
    const entry = text.slice(entryStart, entryEnd + "</entry>".length);

    const pick = (re) => {
      const m = entry.match(re);
      return m ? m[1] : null;
    };

    const id = pick(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const title = pick(/<title>([^<]+)<\/title>/);
    const publishedAt = pick(/<published>([^<]+)<\/published>/);
    const thumbnail = pick(/<media:thumbnail[^>]*url="([^"]+)"/);

    if (!id) {
      console.error("Could not parse videoId from entry", entry.slice(0, 1000));
      return {
        statusCode: 500,
        headers: baseHeaders,
        body: JSON.stringify({ error: "Could not parse video id from feed" }),
      };
    }

    const payload = {
      id,
      url: `https://www.youtube.com/watch?v=${id}`,
      title,
      publishedAt,
      thumbnail,
    };

    return {
      statusCode: 200,
      headers: baseHeaders,
      body: JSON.stringify(payload),
    };
  } catch (err) {
    console.error("Unhandled error:", err);
    return {
      statusCode: 500,
      headers: baseHeaders,
      body: JSON.stringify({ error: "Internal error", detail: err?.message || String(err) }),
    };
  }
};
