import { NextFunction, Request, Response } from 'express';
const { createHash } = require('crypto');
import axios from 'axios';
const fs = require('fs');
import { countries } from 'countries-list';
import { S3 } from 'aws-sdk';
import twilio from 'twilio';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { SmsHelperDto } from '@dtos/helpers/sms-helper.dto';
import States from '@db/state.json';
import Lgas from '@db/lgas.json';
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
      res.status(200).json({ data: [{ key: finale['Name'], value: finale['Name'] }], message: 'data' });
    } catch (error) {
      next(error);
    }
  };
  public getPoliceAreaDivision = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.query);
      const obj = JSON.parse(fs.readFileSync('./eag.json', 'utf8'));
      const data = req.body;
      console.log(req.body, 'state');
      const records = obj.ResponseObject.ReportRecords[2];
      const lga = Lgas.ResponseObject.ReportRecords.filter(lgas => lgas.key === data.lga)[0];
      console.log(lga, 'lga value');
      // console.log(JSON.stringify(obj.ResponseObject.ReportRecords), 'records');
      const commands = records.sub.filter(e => e.StateCode === lga.StateCode)[0].sub;
      const divisions = commands.filter(e => e.LgaCode === lga.value).map(e => ({ key: e.Name, value: e.Code }));
      console.log(divisions);
      // const finale = stateC.sub.filter(sc => sc['Name'].includes('SCID'))[0];
      res.status(200).json({ data: divisions, message: 'data' });
    } catch (error) {
      next(error);
    }
  };
  public getStateLga = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.body);
      console.log(States);
      const data = req.body;
      let result = States.ResponseObject.ReportRecords;
      // const state = NaijaStates.states().filter(s => s === data.state);
      if (data?.state) {
        const state = States.ResponseObject.ReportRecords.filter(s => s.key === data.state)[0];
        result = Lgas.ResponseObject.ReportRecords.filter(lgas => lgas.StateCode === state.value);
        console.log(result);
      }
      res.status(200).json({ data: result, message: 'data' });
    } catch (error) {
      next(error);
    }
  };
  public getState = state => {
    return States.ResponseObject.ReportRecords.filter(s => s.key === state)[0];
  };
  public getStateDivision = (city, div) => {
    const obj = JSON.parse(fs.readFileSync('./eag.json', 'utf8'));
    const records = obj.ResponseObject.ReportRecords[2].sub;
    const commands = records.filter(c => c.StateCode === city.value)[0];
    const res = commands.sub.filter(f => f.Name === div);
    return {
      command: commands.Code,
      division: res[0],
    };
  };
  public getStateCID = (city, div) => {
    const obj = JSON.parse(fs.readFileSync('./eag.json', 'utf8'));
    const records = obj.ResponseObject.ReportRecords[2].sub;
    const commands = records.filter(c => c.StateCode === city.value)[0];
    const res = commands.sub.filter(f => f.Name.includes('SCID'));
    return {
      command: commands.Code,
      division: res[0],
    };
  };
  public getCountries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.body);
      const finale = Object.keys(countries).map(e => ({ key: countries[e].name, value: countries[e].name }));
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
  public reversedeepLook = (arr, len) => {
    const obj = JSON.parse(fs.readFileSync('./eag.json', 'utf8'));
    const mainArr = obj.ResponseObject.ReportRecords;
    const result = [];
    console.log(arr);
    const looper = (arr, len, mainArr) => {
      if (len > 0 && mainArr.length > 0) {
        // console.log('recursion', len, mainArr);
        const filter = mainArr.filter(obj => obj['code']?.toString() === arr[0] || obj['Code'] === arr[0])[0];
        console.log(filter, arr[0]);
        const slice = arr.slice(1);
        result.push(filter?.Name || filter?.name);
        // result = filter.sub;
        looper(slice, len - 1, filter?.sub);
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
    console.log(files);

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
      const location = responses[0].Location;
      console.log(location);
      return res.status(200).json({ status: 'Success', statusCode: 200, message: 'Files uploaded successfully', data: location });
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
