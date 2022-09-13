import { CreatePossapServiceDto, CreatePossapFieldServiceDto } from './../dtos/possap-service.dto';
import { IPossapServiceFields } from './../interfaces/possap-services.interfact';
import PossapService from '@/services/possap-services.service';
import { NextFunction, Request, Response } from 'express';
import PossapSFService from '@/services/possap-sf.service';

class PossapServiceFieldController {
  public possapS = new PossapSFService();

  public findAllPossapServices = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: IPossapServiceFields[] = await this.possapS.findPossapSF();
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  public findServiceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: IPossapServiceFields = await this.possapS.findAPossapSFById(req.query['id']);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  public createPossapService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreatePossapFieldServiceDto = req.body;
      const result = await this.possapS.createPossapSF(payload);
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
}

export default PossapServiceFieldController;
