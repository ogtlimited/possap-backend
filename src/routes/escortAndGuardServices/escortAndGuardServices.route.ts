import { Router } from 'express';
import EscortAndGuardServiceController from '@controllers/escortAndGuardServices/escortAndGuardServices.controller';
import { CreateEscortAndGuardServiceDto } from '@dtos/escortAndGuardService/escortAndGuardService.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import officerMiddleware from '@middlewares/officer.middleware';

class EscortAndGuardServiceRoute implements Routes {
  public path = '/eag';
  public router = Router();
  public EscortAndGuardServiceController = new EscortAndGuardServiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:eagUnit/eag-applications`, this.EscortAndGuardServiceController.getEAG);
    this.router.get(`${this.path}/`, [officerMiddleware], this.EscortAndGuardServiceController.findAll);
    this.router.get(`${this.path}/police-data`, this.EscortAndGuardServiceController.getPoliceData);
    this.router.get(`${this.path}/tactical-squad`, this.EscortAndGuardServiceController.getTacticalSquad);
    this.router.get(`${this.path}/possap`, this.EscortAndGuardServiceController.getFetchPoliceData);
    this.router.get(`${this.path}/:id(\\d+)`, this.EscortAndGuardServiceController.getEAGById);
    this.router.post(
      `${this.path}`,
      [validationMiddleware(CreateEscortAndGuardServiceDto, 'body'), authMiddleware],
      this.EscortAndGuardServiceController.createEAG,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, this.EscortAndGuardServiceController.deleteEAG);
  }
}

export default EscortAndGuardServiceRoute;
