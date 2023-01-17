import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import IncidentsController from '@/controllers/incident.controller';

class IncidentsRoute implements Routes {
  public path = '/incident';
  public router = Router();
  public IncidentController = new IncidentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.IncidentController.findAllIncidents);
    this.router.post(`${this.path}`, this.IncidentController.createIncident);
    this.router.get(`${this.path}/:id`, this.IncidentController.getIncidentById);
    this.router.put(`${this.path}/:id`, this.IncidentController.updateIncident);
    this.router.delete(`${this.path}/:id`, this.IncidentController.deleteIncident);
  }
}

export default IncidentsRoute;
