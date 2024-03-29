import { createHash, createHmac } from 'crypto';
import { OTP_CONFIG, OTP_LENGTH } from './constants';

const otpGenerator = require('otp-generator');
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const generateOTP = () => {
  const OTP = Math.floor(100000 + Math.random() * 900000);
  return OTP;
};
export const ObjectId = function () {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

export const formatBVN = (arg0, arg1, arg2, arg3) => {
  return `${arg0}::${arg1}${arg2}${arg3}`;
};

export const CreateMD5Hash = (data: string) => {
  return createHash('md5').update(data).digest('hex');
};

export const Sha256Hash = (data: string) => {
  return createHash('sha256').update(data).digest('hex');
};
export const HMAC256Hash = (secret, data: string) => {
  const hmac = createHmac('sha256', secret).update(data).digest('base64');
  return hmac;
};
