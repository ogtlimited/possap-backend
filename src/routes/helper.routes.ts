import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import HelperController from '@/controllers/helper-controller/helper.controller';
import multer from 'multer';

const upload = multer();

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
    this.router.post(`${this.path}/verifyAPNumber`, this.helperController.verifyAPNumber);
    this.router.post(`${this.path}/uploadMedia`, upload.array('documents', 2), this.helperController.uploadMedia);
    this.router.post(`${this.path}/sendOtp`, this.helperController.sendOtp);
    // this.router.post(`${this.path}/createBucket`, this.helperController.createBucket);
  }
}

export default HelperRoute;
