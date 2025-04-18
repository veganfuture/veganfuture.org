// signup/app.js
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES();

exports.handler = async (event) => {
  const { name, email } = JSON.parse(event.body);

  console.log("EVENT:", JSON.stringify(event));
  console.log("SES_SOURCE_EMAIL:", process.env.SES_SOURCE_EMAIL);

  // 1) Save to DynamoDB
  await db
    .put({
      TableName: process.env.TABLE_NAME,
      Item: { email, name, timestamp: Date.now() },
    })
    .promise();

  // 2) Send confirmation email
  //await ses
  //  .sendEmail({
  //    Source: process.env.SES_SOURCE_EMAIL,
  //    Destination: { ToAddresses: [email] },
  //    Message: {
  //      Subject: { Data: "Your RAAF Event Registration" },
  //      Body: {
  //        Text: {
  //          Data: `Hi ${name},\n\nThanks for signing up! We’ll see you at the event on the 23rd of May. For more info checkout: https://veganfuture.org/raaf\n\n— The VeganFuture Team`,
  //        },
  //      },
  //    },
  //  })
  //  .promise();

  // 3) Return success
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "ok" }),
  };
};
