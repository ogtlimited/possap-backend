import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CounterTerrorismController from '@/controllers/helper-controllers/counter-terrorism.controller';
import EscortServicesController from '@/controllers/helper-controllers/escort-services.controller';
import ExplosiveODController from '@/controllers/helper-controllers/explosive-od.controller';
import GuardServicesController from '@/controllers/helper-controllers/guard-services.controller';
import PoliceMobileForceController from '@/controllers/helper-controllers/police-mobile-force.controller';
import SpecialProtectionServiceController from '@/controllers/helper-controllers/special-protection-service.controller';
import SpecialProtectionUnitController from '@/controllers/helper-controllers/special-protection-unit.controller';

class HelperDataRoute implements Routes {
  public path = '/helper';
  public router = Router();
  public counterTerrorismController = new CounterTerrorismController();
  public escortServicesController = new EscortServicesController();
  public explosiveOdController = new ExplosiveODController();
  public guardServicesController = new GuardServicesController();
  public policeMobileForceController = new PoliceMobileForceController();
  public specialProtectionServicesController = new SpecialProtectionServiceController();
  public specialProtectionUnitController = new SpecialProtectionUnitController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/counter-terrorsim`, this.counterTerrorismController.getCounterTerrorism);
    this.router.get(`${this.path}/escort-services`, this.escortServicesController.getEscortServices);
    this.router.get(`${this.path}/explosive-od`, this.explosiveOdController.getExplosiveOD);
    this.router.get(`${this.path}/guard-services`, this.guardServicesController.getGuardServices);
    this.router.get(`${this.path}/police-mobile-force`, this.policeMobileForceController.getPoliceMobileForce);
    this.router.get(`${this.path}/special-services`, this.specialProtectionServicesController.getSpecialProtectionServices);
    this.router.get(`${this.path}/special-unit`, this.specialProtectionUnitController.getSpecialProtectionServices);
  }
}

export default HelperDataRoute;
