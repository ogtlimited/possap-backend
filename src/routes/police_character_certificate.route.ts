import { Router } from 'express';
import {
  CreatePoliceCharacterCertificateDTO,
  UpdatePoliceCharacterCertificateDTO
} from "@dtos/police-character-certificate.dto";
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import PoliceCharacterCertificateController from "@controllers/police_character_certificate.controller";
import officerMiddleware from '@middlewares/officer.middleware';
import authMiddleware from "@middlewares/auth.middleware";

class PoliceCharacterCertificateRoute implements Routes{
  public path = '/police-character-certificate';
  public router = Router();
  public controller = new PoliceCharacterCertificateController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //get user certificates
    this.router.get(`${this.path}`, [authMiddleware], this.controller.getUserPoliceCharacterCertificateRecords);

    //get officer certificates
    this.router.get(`${this.path}/officers-extracts`, [officerMiddleware], this.controller.getOfficerPoliceCharacterCertificateRecords);

    //get extract
    this.router.get(`${this.path}/:id`, [], this.controller.getPoliceCharacterCertificateRecord);

    //create extract
    this.router.post(`${this.path}`, [validationMiddleware(CreatePoliceCharacterCertificateDTO, 'body'), authMiddleware], this.controller.createUserPoliceCharacterCertificate);

    //approve
    this.router.patch(
      `${this.path}/approve/:id`,
      [officerMiddleware],
      this.controller.approvePoliceCharacterCertificateRecords,
    );

    //reject
    this.router.patch(
      `${this.path}/reject/:id`,
      [validationMiddleware(UpdatePoliceCharacterCertificateDTO, 'body'), officerMiddleware],
      this.controller.rejectPoliceCharacterCertificateRecords,
    );
  }

}

export default PoliceCharacterCertificateRoute
