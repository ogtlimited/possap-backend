import { NextFunction, Request, Response } from 'express';
import { CreateEscortAndGuardServiceDto } from '@dtos/escortAndGuardService/escortAndGuardService.dto';
import { EscortAndGuardServiceApplication } from '@interfaces/EscortAndGuardServiceApplication/EscortAndGuardServiceApplication.interface';
import EscortAndGuardServiceApplicationService from '@services/escortAndGuardServiceApplication/escortAndGuardServiceApplication.service';
import axios from 'axios';
const fs = require('fs');
const util = require('util');

class EscortAndGuardServiceController {
  public EscortAndGuardService = new EscortAndGuardServiceApplicationService();

  public getEAG = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllEAGData: EscortAndGuardServiceApplication[] = await this.EscortAndGuardService.findAllEAG(req.params.eagUnit, (<any>req).user);

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

  public getFetchPoliceData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    axios
      .get('https://api.npprm.net/commandcategory/POSSAP/MDc5YzIyZTM1ZDAxNzlkYzVkOTViYmUwYTJkMjgxN2RkNmNjMzJhZjQzZmYxNzk2ZWY3OTA3ZWFmYjg5ZmIxMQ==/1')
      .then(function (response) {
        const writeStream = fs.createWriteStream('./eag.json');
        response.data.pipe(writeStream);
        res.status(200).json({ data: response.data, message: 'data' });
      })
      .catch(function (error) {
        next(error);
      });
  };

  public getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const eagId = Number(req.params.id);
      const deleteEAGData: EscortAndGuardServiceApplication = await this.EscortAndGuardService.deleteUser(eagId);

      res.status(200).json({ data: deleteEAGData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getPoliceData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const obj = JSON.parse(fs.readFileSync('./eag.json', 'utf8'));
      const d = this.filterPoliceData(obj.ResponseObject.ReportRecords, 'STATE COMMAND');
      let a = this.groupBy(d[0].sub, 'StateCode');
      if (req.query.statecode && req.query.statecode !== '') {
        const stateCode = req.query.statecode;
        a = a[`${stateCode}`];
      }
      res.status(200).json({ data: a, message: 'police data' });
    } catch (error) {
      next(error);
    }
  };

  public getTacticalSquad = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tacticalSquad = {};
      const obj = JSON.parse(fs.readFileSync('./eag.json', 'utf8'));
      const d = this.filterPoliceData(obj.ResponseObject.ReportRecords, 'FORCE HEADQUARTERS');
      const a = this.groupBy(d[0].sub, 'Name');
      const acceptedTacticalUnit = ['DOPS FHQ ABUJA', 'DRP FHQ ABUJA'];
      acceptedTacticalUnit.map(e => {
        tacticalSquad[e] = a[e];
      });
      const filterTacticalSquad = tacticalSquad['DOPS FHQ ABUJA'][0].sub.filter(squad => {
        return ['CTU', 'SPU', 'PMF', 'EOD'].includes(squad['Name']);
      });
      res.status(200).json({ data: filterTacticalSquad, message: 'police data' });
    } catch (error) {
      next(error);
    }
  };

  public groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  public filterPoliceData(data, filterBY) {
    return data.filter(a => a.name === filterBY);
  }
}

export default EscortAndGuardServiceController;
