import { IEscortServices } from '@/interfaces/helper-interface/escort-services-interface';
import EscortServices from '@/services/helper-services/escort-services.service';
import { NextFunction, Request, Response } from 'express';

class EscortServicesController {
  public escortServices = new EscortServices();

  public getEscortServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllEscortServices: IEscortServices[] = await this.escortServices.findAllEscortServices();

      res.status(200).json({ data: findAllEscortServices, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default EscortServicesController;
