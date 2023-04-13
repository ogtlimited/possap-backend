import { RequestBody } from './../../interfaces/RequestBody';
import { NextFunction, Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';

import * as dotenv from 'dotenv';
import { HMAC256Hash } from '@/utils/util';

dotenv.config();

class CBSController {
  public postRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: RequestBody = req.body;
      console.log(body);
      const config: AxiosRequestConfig = {
        method: body.method,
        maxBodyLength: Infinity,
        url: body.url,
        headers: {
          ...body.headers,
        },
      };
      if (body.method.toUpperCase() === 'POST' || body.method.toUpperCase() === 'PUT') {
        config.data = req.body;
      }
      if (body.hashmessage) {
        console.log('run');
        config.headers = {
          ...body.headers,
          [body.hashField]: HMAC256Hash(body.clientSecret, body.hashmessage),
        };
        config.headers.hashField = HMAC256Hash(body.clientSecret, body.hashmessage);
      }
      console.log(config);
      const result = await axios.request(config);
      if (result.data) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(400).json({ data: null, message: 'Operation failed' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default CBSController;
