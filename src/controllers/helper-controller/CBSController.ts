import { getFile, removeFile } from './../../utils/getFile';
import { RequestBody } from './../../interfaces/RequestBody';
import { NextFunction, Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import * as dotenv from 'dotenv';
import { HMAC256Hash } from '@/utils/util';
import fs from 'fs';
import path from 'path';
import services from '../../db/services.json';
import egsCategoryId from '../../db/egscategoryId.json';
import egssubCategoryId from '../../db/egssubCategoryId.json';
import pccFormData from '../../db/pcc-formdata.json';
import peFormData from '../../db/pe-formdata.json';

const FormData = require('form-data');
dotenv.config();
const filestorage = path.join(__dirname, '../..', 'uploads/');

class CBSController {
  public ExtractRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let fileName = '';
    try {
      const { body, headers, helpers } = req.body.requestObject;
      const data = new FormData();
      const config: AxiosRequestConfig = {
        method: helpers.method,
        maxBodyLength: Infinity,
        url: helpers.url,
        // headers: {
        //   ...headers,
        // },
      };
      if (helpers.method.toUpperCase() === 'POST' || helpers.method.toUpperCase() === 'PUT') {
        Object.keys(body).forEach(v => {
          if (v === 'AffidavitFile') {
            fileName = body[v];
            const file = fs.createReadStream(filestorage + body[v]);
            data.append(v, file);
          } else {
            if (typeof body[v] !== 'string') {
              data.append(v, JSON.stringify(body[v]));
            } else {
              data.append(v, body[v]);
            }
          }
        });
      }

      config.data = data;
      config.headers = {
        ...headers,
        ...data.getHeaders(),
      };
      if (helpers.hashmessage) {
        config.headers[helpers.hashField] = HMAC256Hash(helpers.clientSecret, helpers.hashmessage);
      }
      const result = await axios.request(config);
      if (result.data) {
        removeFile(fileName);
        res.status(200).json({ data: result.data });
      } else {
        res.status(400).json({ data: null, message: 'Operation failed' });
      }
    } catch (error) {
      console.log(error.message);
      removeFile(fileName);
      res.status(400).json({ error: 'error', message: 'Operation failed' });
      //   //next(error);
    }
  };
  public PCCRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let passportphotographfile = '';
    let intpassportdatapagefile = '';
    let proofOfResidenceFile = '';
    try {
      const { body, headers, helpers } = req.body.requestObject;
      const data = new FormData();
      const config: AxiosRequestConfig = {
        method: helpers.method,
        maxBodyLength: Infinity,
        url: helpers.url,
      };
      if (helpers.method.toUpperCase() === 'POST' || helpers.method.toUpperCase() === 'PUT') {
        Object.keys(body).forEach(v => {
          if (v === 'passportphotographfile') {
            passportphotographfile = body[v];
            const file = fs.createReadStream(filestorage + body[v]);
            data.append(v, file);
          } else if (v === 'intpassportdatapagefile') {
            intpassportdatapagefile = body[v];
            const file = fs.createReadStream(filestorage + body[v]);
            data.append(v, file);
          } else if (v === 'proofOfResidenceFile') {
            if (body[v] !== '') {
              proofOfResidenceFile = body[v];
              const file = fs.createReadStream(filestorage + body[v]);
              data.append(v, file);
            }
          } else {
            if (typeof body[v] !== 'string') {
              data.append(v, JSON.stringify(body[v]));
            } else {
              data.append(v, body[v]);
            }
          }
        });
      }
      config.data = data;
      config.headers = {
        ...headers,
        ...data.getHeaders(),
      };
      if (helpers.hashmessage) {
        config.headers[helpers.hashField] = HMAC256Hash(helpers.clientSecret, helpers.hashmessage);
      }
      const result = await axios.request(config);

      if (result.data) {
        removeFile(passportphotographfile);
        removeFile(passportphotographfile);
        removeFile(proofOfResidenceFile);
        res.status(200).json({ data: result.data });
      } else {
        res.status(400).json({ data: null, message: 'Operation failed' });
      }
    } catch (error) {
      console.log(error);
      let errMsg = '';
      if (Array.isArray(error?.response?.data.ResponseObject)) {
        errMsg = error?.response?.data.ResponseObject[0];
      } else {
        errMsg = error?.response?.data.ResponseObject;
      }
      // removeFile(passportphotographfile);
      // removeFile(intpassportdatapagefile);
      res.status(400).json({ error: 'error', message: errMsg });
      //   //next(error);
    }
  };
  public EGSRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body, headers, helpers } = req.body.requestObject;
      const data = new FormData();
      const config: AxiosRequestConfig = {
        method: helpers.method,
        maxBodyLength: Infinity,
        url: helpers.url,
      };
      if (helpers.method.toUpperCase() === 'POST' || helpers.method.toUpperCase() === 'PUT') {
        Object.keys(body).forEach(v => {
          if (typeof body[v] !== 'string') {
            data.append(v, JSON.stringify(body[v]));
          } else {
            data.append(v, body[v]);
          }
        });
      }
      config.data = data;
      config.headers = {
        ...headers,
        ...data.getHeaders(),
      };
      if (helpers.hashmessage) {
        config.headers[helpers.hashField] = HMAC256Hash(helpers.clientSecret, helpers.hashmessage);
      }
      const result = await axios.request(config);
      if (result.data) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(400).json({ data: null, message: 'Operation failed' });
      }
    } catch (error) {
      console.log('error', error.response);
      res.status(400).json({ error: 'error', message: 'Operation failed' });
    }
  };

  public tempUpload = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.file) {
        const { filename } = req.file;
        //getFile(req.file.filename);
        res.status(200).json({ status: 'Success', statusCode: 200, message: 'Files uploaded successfully', data: filename });
      } else {
        res.status(400).json({ message: 'error uploading file' });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error, message: 'Operation failed' });
      //next(error);
    }
  };

  public FetchRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { headers, helpers, body } = req.body.requestObject;
      const config: AxiosRequestConfig = {
        method: helpers.method,
        maxBodyLength: Infinity,
        url: helpers.url,
        timeout: 30000,
        timeoutErrorMessage: 'Request timed out',
      };
      config.headers = {
        ...headers,
      };
      if (body) {
        config.data = body;
      }
      if (helpers.hashmessage) {
        config.headers[helpers.hashField] = HMAC256Hash(helpers.clientSecret, helpers.hashmessage);
      }
      const result = await axios.request(config);
      console.log(result);
      if (result.data) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(400).json({ data: result, message: 'Operation failed' });
      }
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json({ error: error?.response?.data, message: 'Operation failed' });
      //   //next(error);
    }
  };

  public FetchCachedRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { obj } = req.body;
      console.log(obj);
      let result = null;
      switch (obj) {
        case 'service.json':
          result = services;
          break;
        case 'subCategoryId':
          result = egssubCategoryId;
          break;
        case 'categoryId':
          result = egsCategoryId;
          break;
        case 'pcc-formdata':
          result = pccFormData;
          break;
        case 'pe-formdata':
          result = peFormData;
          break;
        default:
          result = null;
          break;
      }
      console.log(result);
      if (result) {
        res.status(200).json({ data: result.data });
      } else {
        res.status(400).json({ data: result, message: 'Operation failed' });
      }
    } catch (error) {
      console.log(error);
      res.status(error.response.status).json({ error: error?.response?.data, message: 'Operation failed' });
      //   //next(error);
    }
  };
}

export default CBSController;
