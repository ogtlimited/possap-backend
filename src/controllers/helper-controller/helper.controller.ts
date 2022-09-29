import { NextFunction, Request, Response } from 'express';
const { createHash } = require('crypto');
import axios from 'axios';
import { HttpException } from '@exceptions/HttpException';
import { S3 } from 'aws-sdk';
import twilio from 'twilio';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { SmsHelperDto } from '@dtos/helpers/sms-helper.dto';
dotenv.config();

class HelperController {
  public verifyNIN = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req;
      const url = `http://52.15.120.183/verify.php?pickNIN=${query.nin}&key=t/BLOvt6c95mV20ka1pqreVkrwprcbdb`;
      const result = await axios.get(url);
      if (result.data) {
        res.status(200).json({ data: result.data, message: 'verified' });
      } else {
        res.status(400).json({ data: null, message: 'Invalid NIN Number' });
      }
    } catch (error) {
      next(error);
    }
  };

  public verifyAPNumber = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = req.body;
    const hash = createHash('sha256')
      .update('POSSAP3U4.4)9434=)@9345K9hjer34&5%34::' + data['ServiceNumber'])
      .digest('hex');
    const signature = Buffer.from(hash).toString('base64');
    const formData = new URLSearchParams();
    formData.append('ServiceNumber', data['ServiceNumber']);

    try {
      const result: any = await axios({
        method: 'post',
        url: 'https://api.npprm.net/personnel/POSSAP/' + signature,
        data: formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      if (result.data) {
        res.status(200).json({ data: result.data, message: 'verified' });
      } else {
        console.log(result);
        res.status(400).json({ data: null, message: 'Invalid NIN Number' });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  /*
   * AWS Configuration
   * */
  private static async awsS3() {
    return new S3({
      accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
      secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
      region: process.env['AWS_REGION'],
    });
  }

  // Upload files
  public uploadMedia = async (req: Request | any, res: Response, next: NextFunction): Promise<unknown> => {
    const files = req.files;

    if (!files) {
      throw new HttpException(400, 'File is required');
    }

    try {
      const awsS3Upload = await HelperController.awsS3();

      const allFilesUpload = files.map(item =>
        awsS3Upload
          .upload({
            Bucket: process.env['AWS_S3_BUCKET'],
            Body: item.buffer,
            Key: String(`${process.env['BUCKET_FOLDER_NAME']}/${Date.now()}-${uuidv4()}.${item.mimetype.split('/').pop()}`),
            ContentType: 'image/jpg',
            ACL: 'public-read',
          })
          .promise(),
      );
      const responses = await Promise.all(allFilesUpload);
      return res.status(200).json({ status: 'Success', statusCode: 200, message: 'Uploaded successfully', data: responses });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  //  Sent otp
  public sendOtp = async (req: Request | any, res: Response, next: NextFunction): Promise<unknown> => {
    const smsHelperDto: SmsHelperDto = req.body;
    const { phoneNumber } = smsHelperDto;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    try {
      return await client.verify.services(process.env.TWILIO_SERVICE_SID).verifications.create({
        to: `${process.env.COUNTRY_CODE}${parseInt(phoneNumber, 10)}`,
        channel: 'sms',
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // Verify otp
  public verifyOtp = async (req: Request | any, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const smsHelperDto: SmsHelperDto = req.body;
      const { phoneNumber, code } = smsHelperDto;

      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);

      const verify = await client.verify.services(process.env.TWILIO_SERVICE_SID).verificationChecks.create({ to: phoneNumber, code: code });

      if (verify.status === 'pending') {
        return res.status(403).json({ message: 'Invalid otp', statusCode: 403 });
      }
      return res.status(200).json({ message: 'Verified successfully', statusCode: 200, status: 'Success' });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  //  One time use
  public createBucket = async (req: Request | any, res: Response, next: NextFunction) => {
    const BUCKET_NAME = process.env['AWS_S3_BUCKET'];
    try {
      const createBucket = await HelperController.awsS3();

      const params = {
        Bucket: BUCKET_NAME,
        CreateBucketConfiguration: {
          LocationConstraint: process.env.AWS_REGION,
        },
      };

      createBucket.createBucket(params, function (err, data) {
        return res.status(200).json({ data: data.Location });
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  public createService = (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);
      const data = client.verify.v2.services.create({ friendlyName: 'Possap' }).then(service => console.log(service.sid));
      return res.status(200).json({ data: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export default HelperController;
