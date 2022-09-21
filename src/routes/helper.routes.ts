import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import HelperController from '@/controllers/helper-controller/helper.controller';
const fs = require('fs');
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
    this.router.post(`${this.path}/police-hr`, this.helperController.getPoliceData);
    this.router.post(`${this.path}/verifyAPNumber`, this.helperController.verifyAPNumber);
  }
}

export default HelperRoute;
