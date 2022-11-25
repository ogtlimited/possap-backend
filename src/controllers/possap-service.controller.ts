import { CreatePossapServiceDto } from './../dtos/possap-service.dto';
import { IPossapService } from './../interfaces/possap-services.interfact';
import PossapService from '@/services/possap-services.service';
import { NextFunction, Request, Response } from 'express';

class PossapServiceController {
  public possapS = new PossapService();

  public findAllPossapServices = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: IPossapService[] = await this.possapS.findPossapServices();
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  public findServiceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.params, req.query);
      const result: IPossapService = await this.possapS.findPossapServiceById(req.params['id']);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  public createPossapService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreatePossapServiceDto = req.body;
      const result = await this.possapS.createPossapService(payload);
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  public updatePosssapService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.possapS.updatePossapService(req.params.id, req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
  public deleteServiceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.params, req.query);
      const result: IPossapService = await this.possapS.deletePossapService(parseInt(req.params['id']));
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
}

export default PossapServiceController;
