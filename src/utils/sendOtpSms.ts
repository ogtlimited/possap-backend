const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
export const sendOtpSMS = (obj) => {
 /// code
 client.messages
  .create({
     body: obj.body,
     from: 'possap.gov.ng',
     to: obj.to
   })
}
