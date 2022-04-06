import { IGuardServices } from '@/interfaces/helper-interface/guard-services-interface';
import GuardServices from '@/services/helper-services/guard-services.service';
import { NextFunction, Request, Response } from 'express';

class GuardServicesController {
  public guardServices = new GuardServices();

  public getGuardServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllGuardServices: IGuardServices[] = await this.guardServices.findAllGuardServices();

      res.status(200).json({ data: findAllGuardServices, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default GuardServicesController;
