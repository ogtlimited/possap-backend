import { IPossapServiceFields } from './../interfaces/possap-services.interfact';
import { NextFunction, Request, Response } from 'express';
import PossapSFService from '@/services/possap-sf.service';
import { CreatePossapFieldServiceDto } from '@/dtos/possap-service.dto';

class PossapServiceFieldController {
  public possapS = new PossapSFService();

  public findAllPossapSF = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: IPossapServiceFields[] = await this.possapS.findPossapSF();
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  public findSFById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: IPossapServiceFields = await this.possapS.findAPossapSFById(req.params.id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
  public getOfficerRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: IPossapServiceFields[] = await this.possapS.officerRequest(req.params.id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  public createPossapSF = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreatePossapFieldServiceDto = req.body;
      const result = await this.possapS.createPossapSF(payload);
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  public updatePosssapSF = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.possapS.updatePossapService(req.params.id, req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
  public approveRequestSF = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.body);
      const result = await this.possapS.approveRequest(parseInt(req.params.id), req.body.officerId, req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
  public updatePosssapSFApprover = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.possapS.updateServiceAprrover(req.params.id, req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
}

export default PossapServiceFieldController;
