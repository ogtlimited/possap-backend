import { NextFunction, Request, Response } from 'express';
const { createHash } = require('crypto');
import axios from 'axios';
const fs = require('fs');
const util = require('util');
import NaijaStates from 'naija-state-local-government';
import { countries } from 'countries-list';
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
        res.status(200).json({ data: result.data.ResponseObject.ReportRecords[0], message: 'verified' });
      } else {
        console.log(result);
        res.status(400).json({ data: null, message: 'Invalid NIN Number' });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getFetchPoliceData = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        'https://api.npprm.net/commandcategory/POSSAP/MDc5YzIyZTM1ZDAxNzlkYzVkOTViYmUwYTJkMjgxN2RkNmNjMzJhZjQzZmYxNzk2ZWY3OTA3ZWFmYjg5ZmIxMQ==/1',
        { responseType: 'stream' },
      );
      data.pipe(fs.createWriteStream('./eag.json'));
    } catch (error) {
      console.log(error);
    }
    // axios
    //   .get(
    //     'https://api.npprm.net/commandcategory/POSSAP/MDc5YzIyZTM1ZDAxNzlkYzVkOTViYmUwYTJkMjgxN2RkNmNjMzJhZjQzZmYxNzk2ZWY3OTA3ZWFmYjg5ZmIxMQ==/1',
    //     { responseType: 'stream' },
    //   )
    //   .then(response => {
    //     const writeStream = fs.createWriteStream('./eag.json');
    //     response.pipe(writeStream);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  public getPoliceData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.query);
      const obj = JSON.parse(fs.readFileSync('./eag.json', 'utf8'));
      const data = req.body.data;
      console.log(obj);
      const records = obj.ResponseObject.ReportRecords;
      const finale = this.deepLook(data, data.length, records);
      res.status(200).json({ data: finale, message: 'data' });
    } catch (error) {
      next(error);
    }
  };
  public getPoliceSCID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.query);
      const obj = JSON.parse(fs.readFileSync('./eag.json', 'utf8'));
      const data = req.body;
      console.log(req.body, 'state');
      const records = obj.ResponseObject.ReportRecords[2];
      // console.log(JSON.stringify(obj.ResponseObject.ReportRecords), 'records');
      const stateC = records.sub.filter(e => {
        const slice = e['Name'].split(' ')[0];
        if (data.state.toLowerCase().includes(slice.toLowerCase())) {
          return e;
        }
      })[0];
      console.log(stateC);
      const finale = stateC.sub.filter(sc => sc['Name'].includes('SCID'))[0];
      res.status(200).json({ data: [finale['Name']], message: 'data' });
    } catch (error) {
      next(error);
    }
  };
  public getStateLga = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.body);
      const data = req.body;
      let result = NaijaStates.states();
      // const state = NaijaStates.states().filter(s => s === data.state);
      if (data?.state) {
        console.log(data.state);
        result = NaijaStates.lgas(data.state).lgas;
      }
      res.status(200).json({ data: result, message: 'data' });
    } catch (error) {
      next(error);
    }
  };
  public getCountries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.body);
      const finale = Object.keys(countries).map(e => countries[e].name);
      console.log(finale);

      res.status(200).json({ data: finale, message: 'data' });
    } catch (error) {
      next(error);
    }
  };

  public deepLook = (arr, len, mainArr) => {
    let result = [];
    const looper = (arr, len, mainArr) => {
      if (len > 0) {
        console.log('recursion', len, mainArr);
        const filter = mainArr.filter(obj => obj['code'] === arr[0] || obj['Code'] === arr[0])[0];
        const slice = arr.slice(1);
        result = filter.sub;
        looper(slice, len - 1, filter.sub);
      }
    };
    looper(arr, len, mainArr);
    return result;
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
      return res.status(200).json({ status: 'Success', statusCode: 200, message: 'Files uploaded successfully', data: responses });
    } catch (err) {
      res.status(500).json({ message: 'An error occurred', statusCode: 500, status: 'Failed' });
      next(err);
    }
  };

  //  Sent otp
  public sendOtp = async (req: Request | any, res: Response, next: NextFunction): Promise<unknown> => {
    const smsHelperDto: SmsHelperDto = req.body;
    const { phone } = smsHelperDto;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    console.log(accountSid, authToken);
    const client = twilio(accountSid, authToken);
    console.log('VERIFICATION SID', process.env.VERIFY_SERVICE_SID);
    try {
      return await client.verify.services(process.env.VERIFY_SERVICE_SID).verifications.create({
        to: `${process.env.COUNTRY_CODE}${parseInt(phone, 10)}`,
        channel: 'sms',
      });
    } catch (err) {
      res.status(500).json({ errors: err });
      next(err);
    }
  };

  // Verify otp
  public verifyOtp = async (req: Request | any, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      const smsHelperDto: SmsHelperDto = req.body;
      const { phone, code } = smsHelperDto;

      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);

      const verify = await client.verify.services(process.env.TWILIO_SERVICE_SID).verificationChecks.create({ to: phone, code: code });

      if (verify.status === 'pending') {
        return res.status(403).json({ message: 'Invalid or expired OTP', statusCode: 403 });
      }
      return res.status(200).json({ message: 'Verified successfully', statusCode: 200, status: 'Success' });
    } catch (err) {
      res.status(500).json({ errors: err });
      next(err);
    }
  };
}

export default HelperController;
