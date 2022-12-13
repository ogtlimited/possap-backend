const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
export const sendOtpSMS = async obj => {
  // code
  console.log('VERIFICATION SID', process.env.VERIFY_SERVICE_SID);
  try {
    return await client.verify.services(process.env.VERIFY_SERVICE_SID).verifications.create({
      to: `${process.env.COUNTRY_CODE}${parseInt(obj.phone, 10)}`,
      channel: 'sms',
    });
  } catch (err) {
    return err;
  }
};

export const verifyOtp = async (obj): Promise<unknown> => {
  try {
    const { phone, code } = obj;
    console.log(obj);
    console.log(`${process.env.COUNTRY_CODE}${parseInt(obj.phone, 10)}`);
    return await client.verify
      .services(process.env.VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: `${process.env.COUNTRY_CODE}${parseInt(obj.phone, 10)}`, code: code });

    // if (verify.status === 'pending') {
    //   return false;
    // }
    // return true;
  } catch (err) {
    return err;
  }
};
