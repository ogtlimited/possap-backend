import { NextFunction, Request, Response } from 'express';
import { CreateEscortAndGuardServiceDto } from '@dtos/escortAndGuardService/escortAndGuardService.dto';
import { EscortAndGuardServiceApplication } from '@interfaces/EscortAndGuardServiceApplication/EscortAndGuardServiceApplication.interface';
import EscortAndGuardServiceApplicationService from '@services/escortAndGuardServiceApplication/escortAndGuardServiceApplication.service';

class EscortAndGuardServiceController {
  public EscortAndGuardService = new EscortAndGuardServiceApplicationService();

  public getEAG = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllEAGData: EscortAndGuardServiceApplication[] = await this.EscortAndGuardService.findAllEAG();

      res.status(200).json({ data: findAllEAGData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getEAGById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eagId = Number(req.params.id);
      const findOneEAGData: EscortAndGuardServiceApplication = await this.EscortAndGuardService.findByEAGId(eagId);

      res.status(200).json({ data: findOneEAGData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createEAG = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const EAGData: CreateEscortAndGuardServiceDto = req.body;
      const createEAGData: EscortAndGuardServiceApplication = await this.EscortAndGuardService.createEAG(EAGData);

      res.status(201).json({ data: createEAGData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteEAG = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eagId = Number(req.params.id);
      const deleteEAGData: EscortAndGuardServiceApplication = await this.EscortAndGuardService.deleteUser(eagId);

      res.status(200).json({ data: deleteEAGData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default EscortAndGuardServiceController;
