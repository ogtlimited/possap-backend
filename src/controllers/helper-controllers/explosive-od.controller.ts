import { IExplosiveOD } from '@/interfaces/helper-interface/explosive-od-interface';
import ExplosiveODServices from '@/services/helper-services/explosive-od.service';
import { NextFunction, Request, Response } from 'express';

class ExplosiveODController {
  public explosiveOD = new ExplosiveODServices();

  public getExplosiveOD = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllExplosiveOD: IExplosiveOD[] = await this.explosiveOD.findAllExplosiveOD();

      res.status(200).json({ data: findAllExplosiveOD, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default ExplosiveODController;
