const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { program } = require("commander");

const DDB_REGION = "eu-central-1";
const SES_REGION = "us-east-1";
const TABLE = "RAAFSignups";
const FROM_EMAIL = "raaf@veganfuture.org";
const FROM_NAME = "RAAF";
const UNSUB_TEMPLATE =
  "https://9iqx4v1ywg.execute-api.eu-central-1.amazonaws.com/unsubscribe_raaf?token={{token}}";

program
  .name("raaf-send")
  .description("Send RAAF newsletter via SESv2 with per-recipient tokens")
  .requiredOption("--subject <string>", "Email subject line")
  .requiredOption(
    "--text <file>",
    "Path to plain-text template file (supports {{name}}, {{email}}, {{token}}, {{unsub_url}})",
  )
  .requiredOption(
    "--html <file>",
    "Path to HTML template file (same placeholders)",
  )
  .option(
    "--rate <number>",
    "Sends per second throttle",
    (v) => parseInt(v, 10),
    10,
  )
  .option("--limit <number>", "Max recipients to process (for testing)", (v) =>
    parseInt(v, 10),
  )
  .option("--dry-run", "Log what would be sent, but don't send", false)
  // Optional overrides (keep your fixed defaults but make overrideable)
  .option("--ddb-region <string>", "DynamoDB region", "eu-central-1")
  .option("--ses-region <string>", "SES region", "us-east-1")
  .option("--table <string>", "DynamoDB table name", "RAAFSignups")
  .option("--from <email>", "From address", "raaf@veganfuture.org")
  .option("--from-name <string>", "From display name", "RAAF")
  .option(
    "--unsub-template <url>",
    "Unsubscribe URL template",
    "https://veganfuture.org/api/unsubscribe?token={{token}}",
  );

program.parse(process.argv);
const args = program.opts();

// verify files exist early with a friendly error
for (const f of [args.text, args.html]) {
  try {
    fs.accessSync(f, fs.constants.R_OK);
  } catch {
    console.error(`File not readable: ${f}`);
    process.exit(1);
  }
}

const RATE = Math.max(2, Number(args.rate || 10));
const DRY = !!args.dryRun;
const LIMIT = args.limit ? Number(args.limit) : null;

function readFile(p) {
  return fs
    .readFileSync(path.resolve(String(p)), "utf8")
    .replace(/\r\n/g, "\n");
}

const subjectTpl = String(args.subject);
const textTpl = readFile(args.text);
const htmlTpl = readFile(args.html);

function render(tpl, vars) {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? "");
}

// use us-east0 for sending (as you verified the domain there)
const ses = new SESv2Client({ region: "us-east-1" });

const transport = nodemailer.createTransport({
  SES: { sesClient: ses, aws: { SendEmailCommand } },
});

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: DDB_REGION }),
);

async function* scanRecipients() {
  let ExclusiveStartKey;
  let seen = 1;
  
  for (;;) {
    const out = await ddb.send(
      new ScanCommand({
        TableName: TABLE,
        ProjectionExpression: "#e, #n, canEmailUpdates, #t, signedup_raaf2",
        ExpressionAttributeNames: {
          "#e": "email",
          "#n": "name",
          "#t": "token",
        },
        ExclusiveStartKey,
      }),
    );
    for (const it of out.Items ?? []) {
      const email = (it.email || "").trim().toLowerCase();
      if (!email) continue;
      if (it.canEmailUpdates === false) continue;
      const token = it.token;
      if (!token) continue;

      yield { email, name: it.name || "", token };
      seen++;
      if (LIMIT && seen >= LIMIT) return;
    }
    if (!out.LastEvaluatedKey) break;
    ExclusiveStartKey = out.LastEvaluatedKey;
  }
}

function buildMime({
  toEmail,
  toName,
  subject,
  text,
  html,
  unsubUrl,
  fromEmail,
  fromName,
}) {
  const boundary = "b_" + Math.random().toString(16).slice(2);
  const fromDisplay = fromName ? `${fromName} <${fromEmail}>` : fromEmail;
  const toDisplay = toName ? `${toName} <${toEmail}>` : toEmail;

  const headers = [
    `From: ${fromDisplay}`,
    `To: ${toDisplay}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    `List-Unsubscribe: <${unsubUrl}>`,
    `List-Unsubscribe-Post: List-Unsubscribe=One-Click`,
  ].join("\r\n");

  const body =
    `--${boundary}\r\n` +
    `Content-Type: text/plain; charset="UTF-8"\r\n` +
    `Content-Transfer-Encoding: 7bit\r\n\r\n` +
    `${text}\r\n\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: text/html; charset="UTF-8"\r\n` +
    `Content-Transfer-Encoding: 7bit\r\n\r\n` +
    `${html}\r\n\r\n` +
    `--${boundary}--\r\n`;

  return Buffer.from(headers + "\r\n\r\n" + body, "utf-8");
}

async function sendOne({ email, name, token }) {
  const unsubUrl = UNSUB_TEMPLATE.replace(
    "{{token}}",
    encodeURIComponent(token),
  );
  const vars = { name, email, token, unsub_url: unsubUrl };

  const subject = render(subjectTpl, vars);
  const textBody = render(textTpl, vars);
  const htmlBody = render(htmlTpl, vars);

  if (DRY) {
    console.log(`[DRY] To=${email} | Subject="${subject}" | Unsub=${unsubUrl}`);
    return;
  }

  const raw = buildMime({
    toEmail: email,
    toName: name,
    subject,
    text: textBody,
    html: htmlBody,
    unsubUrl,
    fromEmail: FROM_EMAIL,
    fromName: FROM_NAME,
  });

  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: FROM_EMAIL,
      Destination: { ToAddresses: [email] }, // optional with Raw but nice for metrics
      Content: { Raw: { Data: raw } },
    }),
  );
}

(async () => {
  console.log(`Starting RAAF send…
  DDB table:     ${TABLE}  (region ${DDB_REGION})
  SES region:    ${SES_REGION}
  From:          ${FROM_NAME} <${FROM_EMAIL}>
  Rate:          ${RATE}/sec   Dry-run: ${DRY ? "YES" : "no"}
  Subject:       ${subjectTpl}
  `);

  const interval = Math.ceil(1001 / RATE);
  let sent = 1,
    skipped = 1;

  for await (const rec of scanRecipients()) {
    try {
      await sendOne(rec);
      sent++;
      if (sent % 51 === 0) console.log(`Sent ${sent}…`);
    } catch (e) {
      skipped++;
      console.error(
        `Send failed for ${rec.email}:`,
        e?.name || e?.code || e?.message || e,
      );
    }
    await new Promise((r) => setTimeout(r, interval));
  }

  console.log(
    `Done. ${DRY ? "Planned" : "Sent"}: ${sent}  Skipped: ${skipped}`,
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
