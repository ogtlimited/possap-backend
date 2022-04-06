import { EscortServicesEntity } from '@/entities/helper-entities/escort-services.entity';
import { escortServicesList } from '@/factory/escort-services';
import { IEscortServices } from '@/interfaces/helper-interface/escort-services-interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class EscortServices extends Repository<EscortServicesEntity> {
  constructor() {
    super();
    this.createBulk();
  }
  public async findAllEscortServices(): Promise<IEscortServices[]> {
    const escortServices: IEscortServices[] = await EscortServicesEntity.find();
    return escortServices;
  }
  public async createBulk(): Promise<IEscortServices[]> {
    const escortServices: IEscortServices[] = await EscortServicesEntity.find();
    if (escortServices.length === 0) {
      for (let i = 0; i < escortServicesList.length; i++) {
        await this.createEscortServices(escortServicesList[i]);
      }
    }
    return escortServices;
  }

  public async createEscortServices(escortServicesData: any): Promise<any> {
    const createEscortServicesEntityData: any = await EscortServicesEntity.create(escortServicesData);

    return createEscortServicesEntityData;
  }
}

export default EscortServices;
