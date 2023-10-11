import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import HelperController from '@/controllers/helper-controller/helper.controller';
import multer from 'multer';
import { SmsHelperDto } from '@dtos/helpers/sms-helper.dto';
const fs = require('fs');
const path = require('path');
const upload = multer();

class HelperRoute implements Routes {
  public path = '/helper';
  public router = Router();
  public helperController = new HelperController();

  constructor() {
    this.initializeRoutes();
    try {
      const p = path.join(__dirname, '..', 'db', 'state-lga.json');
      if (fs.existsSync(p)) {
        console.log('file exists');
      } else {
        console.log('FETCHING DATA...');
        this.helperController.getFetchPoliceData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  private initializeRoutes() {
    console.log('first');
    this.router.get(`${this.path}/verifyNIN`, this.helperController.verifyNIN);
    this.router.get(`${this.path}/all-states`, this.helperController.AllStateLga);
    this.router.post(`${this.path}/verifyAPNumber`, this.helperController.verifyAPNumber);
    this.router.post(`${this.path}/police-hr`, this.helperController.getPoliceData);
    //this.router.post(`${this.path}/uploadMedia`, upload.array('documents', 3), this.helperController.uploadMedia);
    this.router.post(`${this.path}/state-lga`, this.helperController.getStateLga);
    this.router.post(`${this.path}/state-scid`, this.helperController.getPoliceSCID);
    this.router.post(`${this.path}/state-area-division`, this.helperController.getPoliceAreaDivision);
    this.router.post(`${this.path}/countries`, this.helperController.getCountries);
    this.router.post(`${this.path}/download`, this.helperController.downloadFile);
  }
}

export default HelperRoute;
