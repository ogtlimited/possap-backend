import { CounterTerrorismEntity } from '@/entities/helper-entities/counter-terrorism.entity';
import { ICounterTerrorism } from '@/interfaces/helper-interface/counter-terrorism-interface';
import { EntityRepository, Repository } from 'typeorm';
import { counterTerrorismList } from '../../factory/counter-terrorism';

@EntityRepository()
class CounterTerrorismService extends Repository<CounterTerrorismEntity> {
  constructor() {
    super();
    this.createBulk();
  }
  public async findAllCounterTerrorism(): Promise<ICounterTerrorism[]> {
    const counterTerrorism: ICounterTerrorism[] = await CounterTerrorismEntity.find();
    return counterTerrorism;
  }
  public async createBulk(): Promise<ICounterTerrorism[]> {
    const counterTerrorism: ICounterTerrorism[] = await CounterTerrorismEntity.find();
    if (counterTerrorism.length === 0) {
      for (let i = 0; i < counterTerrorismList.length; i++) {
        await this.createCounterTerrorism(counterTerrorismList[i]);
      }
    }
    return counterTerrorism;
  }

  public async createCounterTerrorism(counterTerrorismData: any): Promise<any> {
    const createCounterTerrorismEntityData: any = await CounterTerrorismEntity.create(counterTerrorismData);

    return createCounterTerrorismEntityData;
  }
}

export default CounterTerrorismService;
