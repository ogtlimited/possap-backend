import { Router } from 'express';
import OfficersController from '@controllers/officers.controller';
import { CreateOfficerDto } from '@dtos/officer.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class OfficersRoute implements Routes {
  public path = '/officers';
  public router = Router();
  public OfficersController = new OfficersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.OfficersController.getOfficers);
    this.router.get(`${this.path}/:id(\\d+)`, this.OfficersController.getOfficerById);
    this.router.post(`${this.path}/signup`, validationMiddleware(CreateOfficerDto, 'body'), this.OfficersController.createOfficer);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateOfficerDto, 'body', true), this.OfficersController.updateOfficer);
    this.router.delete(`${this.path}/:id(\\d+)`, this.OfficersController.deleteOfficer);
  }
}

export default OfficersRoute;
