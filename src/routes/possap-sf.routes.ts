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
    this.router.get(`${this.path}/:id`, this.possapSF.findSFById);
    this.router.get(`${this.path}/officer-request/:id`, this.possapSF.getOfficerRequest);
    this.router.post(`${this.path}`, this.possapSF.createPossapSF);
    this.router.put(`${this.path}/:id(\\d+)`, this.possapSF.updatePosssapSF);
    this.router.put(`${this.path}/approve-reject/:id(\\d+)`, this.possapSF.approveRequestSF);
  }
}

export default PossapSFRoute;
