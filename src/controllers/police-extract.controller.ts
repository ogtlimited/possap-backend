import { NextFunction, Request, Response } from 'express';
import {PoliceExtractDto} from "@dtos/police_extract.dto";
import { User } from '@interfaces/users.interface';
import {IPoliceExtract} from "@interfaces/police_extract.interface";
import {IPoliceExtractService} from "@interfaces/police_extract.interface";
import {PoliceExtractService} from "@services/police_extract.service";

class PoliceExtractController {
  public extractService = new PoliceExtractService();

  public getUserPoliceExtracts = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersExtract: IPoliceExtract[] = await this.extractService.getApplicantsExtracts(req.user);
      res.status(200).json({ data: findAllUsersExtract, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOfficerExtracts = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const extracts: IPoliceExtract[] = await this.extractService.getOfficerExtracts(req.user);
      res.status(200).json({ data: extracts, message: 'extracts' });
    } catch (error) {
      next(error);
    }
  };

  public getExtractById = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const extractId = Number(req.params.id);
      const findOneExtract: IPoliceExtract = await this.extractService.getExtract(extractId);
      res.status(200).json({ data: findOneExtract, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createExtract = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const extractData: PoliceExtractDto = req.body;
      const createExtract: IPoliceExtract = await this.extractService.createExtract(req.user, extractData);
      res.status(201).json({ data: createExtract, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public approveExtract = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const extractId = Number(req.params.id);
      const officer = (req.user);
      const info = req.body;
      const updateExtract = await this.extractService.approveExtract(extractId, info);

      res.status(200).json({ data: updateExtract, message: 'extract approved' });
    } catch (error) {
      next(error);
    }
  };

  public rejectExtract = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const extractId = Number(req.params.id);
      const officer = (req.user);
      const info = req.body;
      const updateExtract = await this.extractService.rejectExtract(extractId, info);

      res.status(200).json({ data: updateExtract, message: 'extract rejected' });
    } catch (error) {
      next(error);
    }
  };

}

export default PoliceExtractController;
