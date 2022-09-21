import { NextFunction, Request, Response } from 'express';
const { createHash } = require('crypto');
import axios from 'axios';
const fs = require('fs');
const util = require('util');
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
}

export default HelperController;
