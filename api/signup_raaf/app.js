"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES({ region: "us-east-1" });
const crypto = require("crypto");

const NEWSLETTER_COLUMN = "signedup_newsletter";
const RAAF_EVENT_ID_REGEX = /^raaf\d+$/;
const RAAF4_DINNER_COLUMN = "raaf4_dinner";
const RAAF4_DINNER_WISHES_COLUMN = "raaf4_dinner_wishes";

function getSignupColumn(eventId) {
  if (!eventId) return NEWSLETTER_COLUMN;
  if (RAAF_EVENT_ID_REGEX.test(eventId)) {
    return `signedup_${eventId}`;
  }
  return undefined;
}

function getRaafEmailMessage(eventId, wantsDinner) {
  if (!eventId || !RAAF_EVENT_ID_REGEX.test(eventId)) return null;
  const raafId = eventId.replace("raaf", "");
  const dinnerMessage =
    eventId === "raaf4" && wantsDinner
      ? `
You are also signed up for dinner before the event. Dinner starts at 17:30, is fully vegan, includes one drink, and costs 20 euros to be paid on arrival. If you expect to be late or can no longer make it, please let us know as soon as possible so we can inform the kitchen.`
      : "";

  return {
    subject: `RAAF#${raafId} Registration`,
    body: (name) => `Hi ${name},

Thanks for signing up for RAAF#${raafId}!
${dinnerMessage}

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

  const {
    name,
    email,
    canEmailUpdates = false,
    eventId,
    wantsDinner = false,
    dinnerWishes = "",
  } = body;

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

  console.log(
    "SIGNUP:",
    JSON.stringify({ email, eventId, canEmailUpdates, wantsDinner }),
  );

  const shouldStoreDinner = eventId === "raaf4" && wantsDinner === true;
  const normalizedDinnerWishes =
    typeof dinnerWishes === "string" ? dinnerWishes.trim() : "";
  const updateExpressionParts = [
    "#signup = :true",
    "canEmailUpdates = :can",
    "#ts = if_not_exists(#ts, :ts)",
    "#name = if_not_exists(#name, :name)",
    "#t = if_not_exists(#t, :newToken)",
  ];
  const expressionAttributeNames = {
    "#signup": signupColumn,
    "#ts": "timestamp",
    "#name": "name",
    "#t": "token",
  };
  const expressionAttributeValues = {
    ":true": true,
    ":can": !!canEmailUpdates,
    ":ts": Date.now(),
    ":name": name,
    ":newToken": newToken(),
  };

  if (shouldStoreDinner) {
    updateExpressionParts.push("#raaf4Dinner = :dinnerTrue");
    expressionAttributeNames["#raaf4Dinner"] = RAAF4_DINNER_COLUMN;
    expressionAttributeValues[":dinnerTrue"] = true;

    if (normalizedDinnerWishes) {
      updateExpressionParts.push("#raaf4DinnerWishes = :dinnerWishes");
      expressionAttributeNames["#raaf4DinnerWishes"] = RAAF4_DINNER_WISHES_COLUMN;
      expressionAttributeValues[":dinnerWishes"] = normalizedDinnerWishes;
    }
  }

  //--------------------------------------------------------------------------
  // 2) Upsert: flip the specific event flag, refresh canEmailUpdates, update
  //            timestamp, and *only set name if it was never set before* ----
  //--------------------------------------------------------------------------
  await db
    .update({
      TableName: process.env.TABLE_NAME,
      Key: { email },
      UpdateExpression: `SET ${updateExpressionParts.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    })
    .promise();

  //--------------------------------------------------------------------------
  // 3) (Optional) send email -------------------------------------------------
  //--------------------------------------------------------------------------
  const email_message = getRaafEmailMessage(eventId, shouldStoreDinner);
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
