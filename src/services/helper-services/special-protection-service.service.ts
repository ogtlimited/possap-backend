import { SpecialProtectionServiceEntity } from '@/entities/helper-entities/special-protection-service.entity';
import { specialProtectionServiceList } from '@/factory/special-protection-service';
import { ISpecialProtectionService } from '@/interfaces/helper-interface/special-protection-service-interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class SpecialProtectionServiceServices extends Repository<SpecialProtectionServiceEntity> {
  constructor() {
    super();
    this.createBulk();
  }
  public async findAllSpecialProtectionServices(): Promise<ISpecialProtectionService[]> {
    const specialProtectionServices: ISpecialProtectionService[] = await SpecialProtectionServiceEntity.find();
    return specialProtectionServices;
  }
  public async createBulk(): Promise<ISpecialProtectionService[]> {
    const specialProtectionServices: ISpecialProtectionService[] = await SpecialProtectionServiceEntity.find();
    if (specialProtectionServices.length === 0) {
      for (let i = 0; i < specialProtectionServiceList.length; i++) {
        await this.createSpecialProtectionServices(specialProtectionServiceList[i]);
      }
    }
    return specialProtectionServices;
  }

  public async createSpecialProtectionServices(specialProtectionData: any): Promise<any> {
    const createSpecialProtectionServiceEntityData: any = await SpecialProtectionServiceEntity.create(specialProtectionData);

    return createSpecialProtectionServiceEntityData;
  }
}

export default SpecialProtectionServiceServices;
