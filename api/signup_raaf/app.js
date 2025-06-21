"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES({ region: "us-east-1" }); // we've got production access on us-east-1

// Public event → column map
const SIGNUP_COLUMNS = {
  raaf1: "signedup_raaf1",
  raaf2: "signedup_raaf2",
};

exports.handler = async (event) => {
  //--------------------------------------------------------------------------
  // 1) Parse & validate ------------------------------------------------------
  //--------------------------------------------------------------------------
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Body must be valid JSON" }),
    };
  }

  const { name, email, canEmailUpdates = false, eventId } = body;

  if (!name || !email || !eventId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "'name', 'email' and 'eventId' are required",
      }),
    };
  }

  const signupColumn = SIGNUP_COLUMNS[eventId];
  if (!signupColumn) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Unknown eventId: ${eventId}` }),
    };
  }

  console.log("SIGNUP:", JSON.stringify({ email, eventId, canEmailUpdates }));

  //--------------------------------------------------------------------------
  // 2) Upsert: flip the specific event flag, refresh canEmailUpdates, update
  //            timestamp, and *only set name if it was never set before* ----
  //--------------------------------------------------------------------------
  await db
    .update({
      TableName: process.env.TABLE_NAME,
      Key: { email },
      UpdateExpression:
        "SET #signup = :true, canEmailUpdates = :can, #ts = :ts, #name = if_not_exists(#name, :name)",
      ExpressionAttributeNames: {
        "#signup": signupColumn, // dynamic column name
        "#ts": "timestamp", // "timestamp" is reserved so alias it
        "#name": "name", // "name" is reserved so alias it
      },
      ExpressionAttributeValues: {
        ":true": true,
        ":can": !!canEmailUpdates,
        ":ts": Date.now(),
        ":name": name,
      },
    })
    .promise();

  //--------------------------------------------------------------------------
  // 3) (Optional) send email -------------------------------------------------
  //--------------------------------------------------------------------------
  await ses
    .sendEmail({
      Source: process.env.SES_SOURCE_EMAIL,
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: `Your ${eventId.toUpperCase()} Registration` },
        Body: {
          Text: {
            Data: `Hi ${name},\n\nThanks for signing up for ${eventId === "raaf1" ? "RAAF" : "RAAF2"}! We'll see you there.\n\n— The VeganFuture Team`,
          },
        },
      },
    })
    .promise();

  //--------------------------------------------------------------------------
  // 4) Success ---------------------------------------------------------------
  //--------------------------------------------------------------------------
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "ok" }),
  };
};
