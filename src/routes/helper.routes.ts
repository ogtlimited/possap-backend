import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import HelperController from '@/controllers/helper-controller/helper.controller';
import multer from 'multer';
import validationMiddleware from '@middlewares/validation.middleware';
import { SmsHelperDto } from '@dtos/helpers/sms-helper.dto';
const fs = require('fs');
const upload = multer();

class HelperRoute implements Routes {
  public path = '/helper';
  public router = Router();
  public helperController = new HelperController();

  constructor() {
    this.initializeRoutes();
    try {
      if (fs.existsSync('./eag.json')) {
        console.log('file exists');
      } else {
        this.helperController.getFetchPoliceData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  private initializeRoutes() {
    console.log('first');
    this.router.get(`${this.path}/verifyNIN`, this.helperController.verifyNIN);
    this.router.post(`${this.path}/verifyAPNumber`, this.helperController.verifyAPNumber);
    this.router.post(`${this.path}/police-hr`, this.helperController.getPoliceData);
    this.router.post(`${this.path}/uploadMedia`, upload.array('documents', 3), this.helperController.uploadMedia);
    this.router.post(`${this.path}/sendOtp`, validationMiddleware(SmsHelperDto, 'body'), this.helperController.sendOtp);
    this.router.post(`${this.path}/verifyOtp`, validationMiddleware(SmsHelperDto, 'body'), this.helperController.verifyOtp);
    this.router.post(`${this.path}/state-lga`, this.helperController.getStateLga);
    this.router.post(`${this.path}/state-scid`, this.helperController.getPoliceSCID);
    this.router.post(`${this.path}/state-area-division`, this.helperController.getPoliceAreaDivision);
    this.router.post(`${this.path}/countries`, this.helperController.getCountries);
  }
}

export default HelperRoute;
