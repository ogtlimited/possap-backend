import { NextFunction, Request, Response } from 'express';
const { createHash } = require('crypto');
import axios from 'axios';
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

  public getFetchPoliceData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    axios
      .get('https://api.npprm.net/commandcategory/POSSAP/MDc5YzIyZTM1ZDAxNzlkYzVkOTViYmUwYTJkMjgxN2RkNmNjMzJhZjQzZmYxNzk2ZWY3OTA3ZWFmYjg5ZmIxMQ==/1')
      .then(function (response) {
        // const writeStream = fs.createWriteStream('./eag.json');
        // response.data.pipe(writeStream);
        res.status(200).json({ data: response.data, message: 'data' });
      })
      .catch(function (error) {
        next(error);
      });
  };
}

export default HelperController;
