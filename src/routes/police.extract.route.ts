import { Router } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import PoliceExtractController from "@controllers/police-extract.controller";
import officerMiddleware from "@middlewares/officer.middleware";
import {PoliceExtractDto, UpdatePoliceExtractDto} from "@dtos/police_extract.dto";
import authMiddleware from "@middlewares/auth.middleware";

class PoliceExtractRoute implements Routes {
  public path = '/police-extracts';
  public router = Router();
  public officersController = new PoliceExtractController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //get user extracts
    this.router.get(`${this.path}`, [authMiddleware], this.officersController.getUserPoliceExtracts);

    //get officer extracts
    this.router.get(`${this.path}/officers-extracts`, [officerMiddleware],  this.officersController.getOfficerExtracts);

    //get extract
    this.router.post(`${this.path}/:id`, [], this.officersController.getExtractById);

    //create extract
    this.router.post(`${this.path}/:id`, [validationMiddleware(PoliceExtractDto, 'body'), authMiddleware], this.officersController.createExtract);

    //approve
    this.router.patch(`${this.path}/approve/:id`,[validationMiddleware(UpdatePoliceExtractDto, 'body'), officerMiddleware],  this.officersController.approveExtract);

    //reject
    this.router.delete(`${this.path}/reject/:id`,[validationMiddleware(UpdatePoliceExtractDto, 'body'), officerMiddleware],  this.officersController.rejectExtract);

  }
}

export default PoliceExtractRoute;
