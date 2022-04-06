import { ICounterTerrorism } from '@/interfaces/helper-interface/counter-terrorism-interface';
import CounterTerrorismService from '@/services/helper-services/counter-terrorsim.service';
import { NextFunction, Request, Response } from 'express';

class CounterTerrorismController {
  public counterTerrorism = new CounterTerrorismService();

  public getCounterTerrorism = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCounterTerrorism: ICounterTerrorism[] = await this.counterTerrorism.findAllCounterTerrorism();

      res.status(200).json({ data: findAllCounterTerrorism, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default CounterTerrorismController;
