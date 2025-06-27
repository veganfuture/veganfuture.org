"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES({ region: "us-east-1" });

// Public event → column map
const SIGNUP_COLUMNS = {
  raaf1: "signedup_raaf1",
  raaf2: "signedup_raaf2",
};

const EMAIL_MESSAGES = {
  raaf2: {
    subject: "RAAF#2 Registration",
    body: (name) => `Hi ${name},

Thanks for signing up for RAAF#2!

Doors open on 22nd of August at 18:30 at:

Buurtsalon Jeltje,
Eerste Helmersstraat 106-N 
1054 EG Amsterdam

Please be there before 19:00.  

Happy to have you there,

— The RAAF Team`,
  },
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
  const email_message = EMAIL_MESSAGES[eventId];
  if (email_message) {
    await ses
      .sendEmail({
        Source: process.env.SES_SOURCE_EMAIL,
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: email_message.subject },
          Body: {
            Text: {
              Data: email_message.body(name),
            },
          },
        },
      })
      .promise();
  }

  //--------------------------------------------------------------------------
  // 4) Success ---------------------------------------------------------------
  //--------------------------------------------------------------------------
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "ok" }),
  };
};
