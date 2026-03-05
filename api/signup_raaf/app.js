"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES({ region: "us-east-1" });
const crypto = require("crypto");

const NEWSLETTER_COLUMN = "signedup_newsletter";
const RAAF_EVENT_ID_REGEX = /^raaf\d+$/;

function getSignupColumn(eventId) {
  if (!eventId) return NEWSLETTER_COLUMN;
  if (RAAF_EVENT_ID_REGEX.test(eventId)) {
    return `signedup_${eventId}`;
  }
  return undefined;
}

function getRaafEmailMessage(eventId) {
  if (!eventId || !RAAF_EVENT_ID_REGEX.test(eventId)) return null;
  const raafId = eventId.replace("raaf", "");

  return {
    subject: `RAAF#${raafId} Registration`,
    body: (name) => `Hi ${name},

Thanks for signing up for RAAF#${raafId}!

For more information about RAAF, check out:
https://veganfuture.org/raaf/${raafId}

Happy to have you there,

— The RAAF Team`,
  };
}

// 128-bit random token, URL-safe
function newToken() {
  return crypto.randomBytes(16).toString("base64url");
}

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

  if (!name || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `'name' and 'email' are required`,
      }),
    };
  }

  const signupColumn = getSignupColumn(eventId);
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
        "SET #signup = :true, canEmailUpdates = :can, #ts = if_not_exists(#ts, :ts), #name = if_not_exists(#name, :name), #t = if_not_exists(#t, :newToken)",
      ExpressionAttributeNames: {
        "#signup": signupColumn, // dynamic column name
        "#ts": "timestamp", // "timestamp" is reserved so alias it
        "#name": "name", // "name" is reserved so alias it
        "#t": "token",
      },
      ExpressionAttributeValues: {
        ":true": true,
        ":can": !!canEmailUpdates,
        ":ts": Date.now(),
        ":name": name,
        ":newToken": newToken(),
      },
    })
    .promise();

  //--------------------------------------------------------------------------
  // 3) (Optional) send email -------------------------------------------------
  //--------------------------------------------------------------------------
  const email_message = getRaafEmailMessage(eventId);
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
