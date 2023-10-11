import { formatBVN, CreateMD5Hash, Sha256Hash } from './../../utils/util';
import { NextFunction, Request, Response } from 'express';
const { createHash } = require('crypto');
import axios from 'axios';
const fs = require('fs');
import { countries } from 'countries-list';
//import { S3 } from 'aws-sdk';
import twilio from 'twilio';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { SmsHelperDto } from '@dtos/helpers/sms-helper.dto';
// import States from '@db/state.json';
// import Lgas from '@db/lgas.json';
import { fetchData } from '@/utils/fetchData';
import { fileImporter } from '@/utils/getFile';

dotenv.config();
const cbsBasePath = 'https://test.possap.ng/api/v1/pss/';
// const cbsBasePath = 'http://pss.cbs/api/v1/pss/';

class HelperController {
  async downloadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result: any = await axios({
        method: 'get',
        url: req.body.url,
        responseType: 'arraybuffer',
      });
      console.log(req.body.url);
      const base64 = Buffer.from(result.data, 'binary').toString('base64');
      // console.log(base64);
      res.status(200).json({ data: base64, message: 'Download successful' });
    } catch (error) {
      console.log(error);
    }
  }

  public verifyNIN = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req;
      const url = `http://52.15.120.183/verify.php?pickNIN=${query.nin}&key=t-BL1Ovt6c95mV20ka1pqre2VkrwprcbdbKLM`;
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
  public verifyBVN = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const BVNValidationUsername = process.env.BVNValidationUsername;
    const BVNValidationSecret = process.env.FourCoreBVNValidationSecret;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatString = formatBVN(BVNValidationUsername, year, month, day);
    const mdHash = CreateMD5Hash(formatString);
    const signatureHash = Sha256Hash(mdHash);
    console.log(signatureHash);
    try {
      const { query } = req;
      const url = `http://165.227.168.192/api/open/validate-bvn?bvn=${query.bvn}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `${BVNValidationSecret}`,
          Signature: `${signatureHash}`,
        },
      });
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
      const endpoints = [
        { url: cbsBasePath + 'utility/get-states-lgas', path: 'state-lga.json' },
        {
          url: 'https://api.npprm.net/commandcategory/POSSAP/MDc5YzIyZTM1ZDAxNzlkYzVkOTViYmUwYTJkMjgxN2RkNmNjMzJhZjQzZmYxNzk2ZWY3OTA3ZWFmYjg5ZmIxMQ==/1',
          path: 'eag.json',
        },
      ];
      fetchData(endpoints[0].url, endpoints[0].path);
    } catch (error) {
      console.log(error);
    }
  };

  public getPoliceData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.query);
      const obj = JSON.parse(fs.readFileSync('./eag.json', 'utf8'));
      const data = req.body.data;
      console.log(obj, 'obk');
      const records = obj.ResponseObject.ReportRecords;
      const finale = this.deepLook(data, data.length, records);
      res.status(200).json({ data: finale, message: 'data' });
    } catch (error) {
      next(error);
    }
  };
  public getPoliceSCID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body;
      console.log(data);
      const fetch = await axios.get(cbsBasePath + 'utility/get-active-state-commands/' + data.state + '/' + data.serviceId);
      console.log(fetch);
      const commands = fetch.data.ResponseObject.stateLga.map(v => ({ value: v.Id, label: v.Name }));
      // const finale = stateC.sub.filter(sc => sc['Name'].includes('SCID'))[0];
      res.status(200).json({ data: commands, message: 'data' });
    } catch (error) {
      next(error);
    }
  };
  public getPoliceAreaDivision = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.query);
      const data = req.body;
      console.log(data);
      const fetch = await axios.get(cbsBasePath + 'utility/get-lga-area-and-divisional-commands/' + data.state);
      const commands = fetch.data.ResponseObject.stateLga.map(v => ({ value: v.Id, label: v.Name }));
      // const finale = stateC.sub.filter(sc => sc['Name'].includes('SCID'))[0];
      res.status(200).json({ data: commands, message: 'data' });
    } catch (error) {
      next(error);
    }
  };
  public getStateLga = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allstate = await fileImporter('state-lga.json');

      // console.log(req.body);
      // console.log(States);
      const data = req.body;
      // console.log(allstate.ResponseObject.stateLga);

      // console.log(fetch.data.ResponseObject);
      const raw = allstate.ResponseObject.stateLga;
      const states = allstate.ResponseObject.stateLga;
      let result = states.map(s => ({ value: s.Id, label: s.Name }));

      // const state = NaijaStates.states().filter(s => s === data.state);
      if (data?.state) {
        const filteredstate = raw.filter(s => s.Id === parseInt(data.state))[0];
        // console.log(filteredstate);
        result = filteredstate.LGAs.map(lgas => ({ value: lgas.Id, label: lgas.Name }));
        //console.log(result);
      }
      res.status(200).json({ data: result, message: 'data' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  public AllStateLga = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allstate = await fileImporter('state-lga.json');

      console.log(allstate.ResponseObject.stateLga);

      // console.log(fetch.data.ResponseObject);
      const states = allstate.ResponseObject.stateLga;

      res.status(200).json({ data: states, message: 'data' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  public getState = state => {
    // return States.ResponseObject.ReportRecords.filter(s => s.key === state)[0];
    return '';
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

  // /*
  //  * AWS Configuration
  //  * */
  // private static async awsS3() {
  //   return new S3({
  //     accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
  //     secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
  //     region: process.env['AWS_REGION'],
  //   });
  // }

  // Upload files
  // public uploadMedia = async (req: Request | any, res: Response, next: NextFunction): Promise<unknown> => {
  //   const files = req.files;
  //   console.log(files, 'FILES');
  //   if (!req.files) {
  //     res.send('No files to upload.');
  //     return;
  //   }

  //   try {
  //     const awsS3Upload = await HelperController.awsS3();

  //     const allFilesUpload = files.map(item =>
  //       awsS3Upload
  //         .upload({
  //           Bucket: process.env['AWS_S3_BUCKET'],
  //           Body: item.buffer,
  //           Key: String(`${process.env['BUCKET_FOLDER_NAME']}/${Date.now()}-${uuidv4()}.${item.mimetype.split('/').pop()}`),
  //           ContentType: 'image/jpg',
  //           ACL: 'public-read',
  //         })
  //         .promise(),
  //     );
  //     const responses = await Promise.all(allFilesUpload);
  //     const location = responses[0].Location;
  //     console.log(location);
  //     return res.status(200).json({ status: 'Success', statusCode: 200, message: 'Files uploaded successfully', data: location });
  //   } catch (err) {
  //     res.status(500).json({ message: 'An error occurred', statusCode: 500, status: 'Failed' });
  //     next(err);
  //   }
  // };

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
