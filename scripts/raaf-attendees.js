const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { program } = require("commander");

program
  .name("raaf-attendees")
  .description(
    "List RAAF attendees by event with names, emails, and RAAF 4 dinner details",
  )
  .option("--ddb-region <string>", "DynamoDB region", "eu-central-1")
  .option("--table <string>", "DynamoDB table name", "RAAFSignups")
  .option("--event <string>", "Filter to a single eventId (e.g. raaf4)");

program.parse(process.argv);
const args = program.opts();

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: args.ddbRegion }),
);

function getEventIds(item) {
  return Object.keys(item)
    .filter((key) => key.startsWith("signedup_raaf") && item[key] === true)
    .map((key) => key.replace("signedup_", ""));
}

function sortEventIds(eventIds) {
  return eventIds.sort((a, b) => {
    const aNum = Number(a.replace("raaf", ""));
    const bNum = Number(b.replace("raaf", ""));
    if (Number.isNaN(aNum) || Number.isNaN(bNum)) return a.localeCompare(b);
    return aNum - bNum;
  });
}

async function scanAll() {
  const events = new Map();
  let ExclusiveStartKey;

  for (;;) {
    const out = await ddb.send(
      new ScanCommand({
        TableName: args.table,
        ExclusiveStartKey,
      }),
    );

    for (const item of out.Items ?? []) {
      const email = (item.email || "").trim();
      if (!email) continue;
      const name = (item.name || "").trim();
      const eventIds = getEventIds(item);

      for (const eventId of eventIds) {
        if (args.event && args.event !== eventId) continue;
        if (!events.has(eventId)) events.set(eventId, []);
        events.get(eventId).push({
          name,
          email,
          wantsDinner: item.raaf4_dinner === true,
          dinnerWishes: (item.raaf4_dinner_wishes || "").trim(),
        });
      }
    }

    if (!out.LastEvaluatedKey) break;
    ExclusiveStartKey = out.LastEvaluatedKey;
  }

  const sortedEventIds = sortEventIds([...events.keys()]);
  if (sortedEventIds.length === 0) {
    console.log("No attendees found.");
    return;
  }

  for (const eventId of sortedEventIds) {
    const attendees = events.get(eventId) || [];
    console.log(`${eventId.toUpperCase()}: ${attendees.length} attendee(s)`);
    attendees
      .sort((a, b) => a.email.localeCompare(b.email))
      .forEach((attendee) => {
        const label = attendee.name
          ? `${attendee.name} <${attendee.email}>`
          : attendee.email;
        if (eventId === "raaf4") {
          const dinnerStatus = attendee.wantsDinner ? "yes" : "no";
          const wishes = attendee.dinnerWishes
            ? ` | wishes: ${attendee.dinnerWishes}`
            : "";
          console.log(`- ${label} | dinner: ${dinnerStatus}${wishes}`);
          return;
        }
        console.log(`- ${label}`);
      });
    console.log("");
  }
}

scanAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
