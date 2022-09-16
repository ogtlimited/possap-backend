import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import HelperController from '@/controllers/helper-controller/helper.controller';

class HelperRoute implements Routes {
  public path = '/helper';
  public router = Router();
  public helperController = new HelperController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log('first');
    this.router.get(`${this.path}/verifyNIN`, this.helperController.verifyNIN);
    this.router.get(`${this.path}/police-hr`, this.helperController.getFetchPoliceData);
    this.router.post(`${this.path}/verifyAPNumber`, this.helperController.verifyAPNumber);
  }
}

export default HelperRoute;
