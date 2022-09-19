import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import PossapServiceFieldController from '@/controllers/possap-service-fields.controller';

class PossapSFRoute implements Routes {
  public path = '/possap-service-fields';
  public router = Router();
  public possapSF = new PossapServiceFieldController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.possapSF.findAllPossapSF);
    this.router.get(`${this.path}/:id(\\d+)`, this.possapSF.findSFById);
    this.router.post(`${this.path}`, this.possapSF.createPossapSF);
    this.router.put(`${this.path}/:id(\\d+)`, this.possapSF.updatePosssapSF);
  }
}

export default PossapSFRoute;