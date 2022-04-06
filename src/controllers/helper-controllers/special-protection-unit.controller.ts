import { ISpecialProtectionUnit } from '@/interfaces/helper-interface/special-protection-unit-interface';
import SpecialProtectionUnitServices from '@/services/helper-services/special-protection-unit.service';
import { NextFunction, Request, Response } from 'express';

class SpecialProtectionUnitController {
  public specialProtectionService = new SpecialProtectionUnitServices();

  public getSpecialProtectionServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllSpecialProtectionUnits: ISpecialProtectionUnit[] = await this.specialProtectionService.findAllSpecialProtectionServices();

      res.status(200).json({ data: findAllSpecialProtectionUnits, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default SpecialProtectionUnitController;
