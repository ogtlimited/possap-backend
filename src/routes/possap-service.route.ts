import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import PossapServiceController from '@/controllers/possap-service.controller';

class PossapServiceRoute implements Routes {
  public path = '/possap-services';
  public router = Router();
  public possapS = new PossapServiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.possapS.findAllPossapServices);
    this.router.get(`${this.path}/:id(\\d+)`, this.possapS.findServiceById);
    this.router.get(`${this.path}/service-charge/:id(\\d+)`, this.possapS.getServiceCharge);
    this.router.post(`${this.path}`, this.possapS.createPossapService);
    this.router.put(`${this.path}/:id(\\d+)`, this.possapS.updatePosssapService);
    this.router.delete(`${this.path}/:id(\\d+)`, this.possapS.deleteServiceById);
  }
}

export default PossapServiceRoute;
