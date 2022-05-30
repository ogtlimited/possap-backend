import { NextFunction, Response } from 'express';
import {CreatePoliceCharacterCertificateDTO} from "@dtos/police-character-certificate.dto";
import {IPoliceCharacterCertificate} from "@interfaces/police_character_cert.interface";
import {PoliceCharacterCertificateService} from "@services/police_character_certificate.service";

class PoliceCharacterCertificateController {
  public policeCharacterCertificateService = new PoliceCharacterCertificateService();

  public getUserPoliceCharacterCertificateRecords = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const records: IPoliceCharacterCertificate[] = await this.policeCharacterCertificateService.getUserPoliceCharacterCertificateRecords(req.user);
      res.status(200).json({ data: records});
    } catch (error) {
      next(error);
    }
  };

  public getOfficerPoliceCharacterCertificateRecords = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const extracts: IPoliceCharacterCertificate[] = await this.policeCharacterCertificateService.getOfficerPoliceCharacterCertificateRecords(req.user);
      res.status(200).json({ data: extracts});
    } catch (error) {
      next(error);
    }
  };

  public getPoliceCharacterCertificateRecord = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const findOneExtract: IPoliceCharacterCertificate = await this.policeCharacterCertificateService.getPoliceCharacterCertificateRecord(id);
      res.status(200).json({ data: findOneExtract});
    } catch (error) {
      next(error);
    }
  };

  public createUserPoliceCharacterCertificate = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreatePoliceCharacterCertificateDTO = req.body;
      const record: IPoliceCharacterCertificate = await this.policeCharacterCertificateService.createUserPoliceCharacterCertificate(req.user, payload);
      res.status(201).json({ data: record});
    } catch (error) {
      next(error);
    }
  };

  public approvePoliceCharacterCertificateRecords = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const officer = (req.user);
      const result = await this.policeCharacterCertificateService.approvePoliceCharacterCertificateRecords(id, req.body, officer);
      res.status(200).json({ data: result, message: 'extract approved' });
    } catch (error) {
      next(error);
    }
  };

  public rejectPoliceCharacterCertificateRecords = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const officer = (req.user);
      const result = await this.policeCharacterCertificateService.rejectPoliceCharacterCertificateRecords(id, officer, req.body);
      res.status(200).json({ data: result, message: 'extract rejected' });
    } catch (error) {
      next(error);
    }
  };

}

export default PoliceCharacterCertificateController;
