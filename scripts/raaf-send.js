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

const DEFAULT_DDB_REGION = "eu-central-1";
const DEFAULT_SES_REGION = "us-east-1";
const DEFAULT_TABLE = "RAAFSignups";
const DEFAULT_FROM_EMAIL = "raaf@veganfuture.org";
const DEFAULT_FROM_NAME = "RAAF";
const DEFAULT_UNSUB_TEMPLATE =
  "https://veganfuture.org/api/unsubscribe?token={{token}}";
const EVENT_ID_REGEX = /^raaf\d+$/;

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
  .option(
    "--event <string>",
    "Only send to attendees of a specific eventId (e.g. raaf4)",
  )
  .option("--newsletter", "Only send to newsletter signups", false)
  .option(
    "--exclude-event <string>",
    "Exclude attendees of a specific eventId (e.g. raaf4)",
  )
  .option("--ddb-region <string>", "DynamoDB region", DEFAULT_DDB_REGION)
  .option("--ses-region <string>", "SES region", DEFAULT_SES_REGION)
  .option("--table <string>", "DynamoDB table name", DEFAULT_TABLE)
  .option("--from <email>", "From address", DEFAULT_FROM_EMAIL)
  .option("--from-name <string>", "From display name", DEFAULT_FROM_NAME)
  .option(
    "--unsub-template <url>",
    "Unsubscribe URL template",
    DEFAULT_UNSUB_TEMPLATE,
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
const INCLUDE_EVENT = args.event ? String(args.event).trim() : null;
const EXCLUDE_EVENT = args.excludeEvent
  ? String(args.excludeEvent).trim()
  : null;
const NEWSLETTER_ONLY = !!args.newsletter;
const DDB_REGION = String(args.ddbRegion);
const SES_REGION = String(args.sesRegion);
const TABLE = String(args.table);
const FROM_EMAIL = String(args.from);
const FROM_NAME = String(args.fromName);
const UNSUB_TEMPLATE = String(args.unsubTemplate);

if (INCLUDE_EVENT && !EVENT_ID_REGEX.test(INCLUDE_EVENT)) {
  console.error(
    `Invalid eventId: ${INCLUDE_EVENT}. Expected format: raaf<number>.`,
  );
  process.exit(1);
}

if (EXCLUDE_EVENT && !EVENT_ID_REGEX.test(EXCLUDE_EVENT)) {
  console.error(
    `Invalid exclude-event: ${EXCLUDE_EVENT}. Expected format: raaf<number>.`,
  );
  process.exit(1);
}

if (INCLUDE_EVENT && NEWSLETTER_ONLY) {
  console.error("Use either --event or --newsletter, not both.");
  process.exit(1);
}

const INCLUDE_EVENT_COLUMN = INCLUDE_EVENT ? `signedup_${INCLUDE_EVENT}` : null;
const EXCLUDE_EVENT_COLUMN = EXCLUDE_EVENT ? `signedup_${EXCLUDE_EVENT}` : null;
const NEWSLETTER_COLUMN = NEWSLETTER_ONLY ? "signedup_newsletter" : null;

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

const ses = new SESv2Client({ region: SES_REGION });

const transport = nodemailer.createTransport({
  SES: { sesClient: ses, aws: { SendEmailCommand } },
});

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: DDB_REGION }),
);

async function* scanRecipients() {
  let ExclusiveStartKey;
  let seen = 0;

  for (;;) {
    const projection = ["#e", "#n", "canEmailUpdates", "#t"];
    const expressionNames = {
      "#e": "email",
      "#n": "name",
      "#t": "token",
    };
    if (INCLUDE_EVENT_COLUMN) {
      projection.push("#includeEvent");
      expressionNames["#includeEvent"] = INCLUDE_EVENT_COLUMN;
    }
    if (EXCLUDE_EVENT_COLUMN) {
      projection.push("#excludeEvent");
      expressionNames["#excludeEvent"] = EXCLUDE_EVENT_COLUMN;
    }
    if (NEWSLETTER_COLUMN) {
      projection.push("#newsletter");
      expressionNames["#newsletter"] = NEWSLETTER_COLUMN;
    }

    const out = await ddb.send(
      new ScanCommand({
        TableName: TABLE,
        ProjectionExpression: projection.join(", "),
        ExpressionAttributeNames: expressionNames,
        ExclusiveStartKey,
      }),
    );
    for (const it of out.Items ?? []) {
      const email = (it.email || "").trim().toLowerCase();
      if (!email) continue;
      if (it.canEmailUpdates === false) continue;
      const token = it.token;
      if (!token) continue;
      if (INCLUDE_EVENT_COLUMN && it[INCLUDE_EVENT_COLUMN] !== true) continue;
      if (EXCLUDE_EVENT_COLUMN && it[EXCLUDE_EVENT_COLUMN] === true) continue;
      if (NEWSLETTER_COLUMN && it[NEWSLETTER_COLUMN] !== true) continue;

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
  Newsletter:    ${NEWSLETTER_ONLY ? "yes" : "no"}
  Include event: ${INCLUDE_EVENT || "-"}
  Exclude event: ${EXCLUDE_EVENT || "-"}
  Subject:       ${subjectTpl}
  `);

  const interval = Math.ceil(1001 / RATE);
  let sent = 0;
  let skipped = 0;

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
