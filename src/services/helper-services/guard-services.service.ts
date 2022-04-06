import { GuardServicesEntity } from '@/entities/helper-entities/guard-services.entity';
import { guardServiceList } from '@/factory/guard-service';
import { IGuardServices } from '@/interfaces/helper-interface/guard-services-interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class GuardServices extends Repository<GuardServicesEntity> {
  constructor() {
    super();
    this.createBulk();
  }
  public async findAllGuardServices(): Promise<IGuardServices[]> {
    const guardServices: IGuardServices[] = await GuardServicesEntity.find();
    return guardServices;
  }
  public async createBulk(): Promise<IGuardServices[]> {
    const guardServices: IGuardServices[] = await GuardServicesEntity.find();
    if (guardServices.length === 0) {
      for (let i = 0; i < guardServiceList.length; i++) {
        await this.createGuardServices(guardServiceList[i]);
      }
    }
    return guardServices;
  }

  public async createGuardServices(guardServicesData: any): Promise<any> {
    const createGuardServicesEntityData: any = await GuardServicesEntity.create(guardServicesData);

    return createGuardServicesEntityData;
  }
}

export default GuardServices;
