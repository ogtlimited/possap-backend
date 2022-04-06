import { ExplosiveODEntity } from '@/entities/helper-entities/explosive-od.entity';
import { explosiveODList } from '@/factory/explosive-od';
import { IExplosiveOD } from '@/interfaces/helper-interface/explosive-od-interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class ExplosiveODServices extends Repository<ExplosiveODEntity> {
  constructor() {
    super();
    this.createBulk();
  }
  public async findAllExplosiveOD(): Promise<IExplosiveOD[]> {
    const explosiveOd: IExplosiveOD[] = await ExplosiveODEntity.find();
    return explosiveOd;
  }
  public async createBulk(): Promise<IExplosiveOD[]> {
    const explosiveOd: IExplosiveOD[] = await ExplosiveODEntity.find();
    if (explosiveOd.length === 0) {
      for (let i = 0; i < explosiveODList.length; i++) {
        await this.createExplosiveOD(explosiveODList[i]);
      }
    }
    return explosiveOd;
  }

  public async createExplosiveOD(explosiveOdData: any): Promise<any> {
    const createExplosiveODEntityData: any = await ExplosiveODEntity.create(explosiveOdData);

    return createExplosiveODEntityData;
  }
}

export default ExplosiveODServices;
