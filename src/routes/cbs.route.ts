import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CBSController from '@/controllers/helper-controller/CBSController';

class CBSRoute implements Routes {
  public path = '/cbs-routes';
  public router = Router();
  public cbs = new CBSController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.cbs.postRequest);
  }
}

export default CBSRoute;
