import { NextFunction, Request, Response } from 'express';
import { CreateOfficerDto } from '@dtos/officer.dto';
import { IOfficers } from '@interfaces/officer.interface';
import OfficerService from '@services/officers.service';

class OfficersController {
  public OfficerService = new OfficerService();

  public getOfficers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllOfficersData: IOfficers[] = await this.OfficerService.findAllOfficer();

      res.status(200).json({ data: findAllOfficersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOfficerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const OfficerId = Number(req.params.id);
      const findOneOfficerData: IOfficers = await this.OfficerService.findOfficerById(OfficerId);

      res.status(200).json({ data: findOneOfficerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createOfficer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const OfficerData: CreateOfficerDto = req.body;
      const createOfficerData: IOfficers = await this.OfficerService.createOfficer(OfficerData);

      res.status(201).json({ data: createOfficerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateOfficer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const OfficerId = Number(req.params.id);
      const OfficerData: CreateOfficerDto = req.body;
      const updateOfficerData: IOfficers = await this.OfficerService.updateOfficer(OfficerId, OfficerData);

      res.status(200).json({ data: updateOfficerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteOfficer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const OfficerId = Number(req.params.id);
      const deleteOfficerData: IOfficers = await this.OfficerService.deleteOfficer(OfficerId);

      res.status(200).json({ data: deleteOfficerData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default OfficersController;
