import { NextFunction, Request, Response } from 'express';
import IncidentService from '@/services/incident.service';
import { IIncident } from '@/interfaces/incident.interface';

class IncidentsController {
  public IncidentService = new IncidentService();

  public findAllIncidents = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allIncidentServices = await this.IncidentService.findAllIncidents(req.Incident);
      res.status(200).json({ data: allIncidentServices, message: 'findAllIncidentServices' });
    } catch (error) {
      next(error);
    }
  };

  public getIncidentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const IncidentId = Number(req.params.id);
      const findOneIncidentData: IIncident = await this.IncidentService.getIncident(IncidentId);

      res.status(200).json({ data: findOneIncidentData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createIncident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const IncidentData = req.body;
      const createIncidentData: IIncident = await this.IncidentService.createIncident(IncidentData);

      res.status(201).json({ data: createIncidentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateIncident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const IncidentId = Number(req.params.id);
      const IncidentData = req.body;
      const updateIncidentData: IIncident = await this.IncidentService.updateIncident(IncidentId, IncidentData);

      res.status(200).json({ data: updateIncidentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteIncident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const IncidentId = req.params.id;
      const deleteIncidentData: IIncident = await this.IncidentService.deleteIncident(IncidentId);

      res.status(200).json({ data: deleteIncidentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default IncidentsController;
