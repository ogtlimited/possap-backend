import { IPoliceMobileForce } from '@/interfaces/helper-interface/police-mobile-force-interface';
import PobliceMobileForceServices from '@/services/helper-services/police-mobile-force.service';
import { NextFunction, Request, Response } from 'express';

class PoliceMobileForceController {
  public policeMobileForce = new PobliceMobileForceServices();

  public getPoliceMobileForce = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPoliceMobileForceServices: IPoliceMobileForce[] = await this.policeMobileForce.findAllPoliceMobileForceServices();

      res.status(200).json({ data: findAllPoliceMobileForceServices, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default PoliceMobileForceController;
