import { ISpecialProtectionService } from '@/interfaces/helper-interface/special-protection-service-interface';
import SpecialProtectionServiceServices from '@/services/helper-services/special-protection-service.service';
import { NextFunction, Request, Response } from 'express';

class SpecialProtectionServiceController {
  public specialProtectionService = new SpecialProtectionServiceServices();

  public getSpecialProtectionServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllSpecialProtectionServices: ISpecialProtectionService[] = await this.specialProtectionService.findAllSpecialProtectionServices();

      res.status(200).json({ data: findAllSpecialProtectionServices, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default SpecialProtectionServiceController;
