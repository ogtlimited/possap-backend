import { SpecialProtectionUnitEntity } from '@/entities/helper-entities/special-protection-unit.entity';
import { specialProtectionUnitList } from '@/factory/special-protection-unit';
import { ISpecialProtectionUnit } from '@/interfaces/helper-interface/special-protection-unit-interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class SpecialProtectionUnitServices extends Repository<SpecialProtectionUnitEntity> {
  constructor() {
    super();
    this.createBulk();
  }
  public async findAllSpecialProtectionServices(): Promise<ISpecialProtectionUnit[]> {
    const specialProtectionServices: ISpecialProtectionUnit[] = await SpecialProtectionUnitEntity.find();
    return specialProtectionServices;
  }
  public async createBulk(): Promise<ISpecialProtectionUnit[]> {
    const specialProtectionServices: ISpecialProtectionUnit[] = await SpecialProtectionUnitEntity.find();
    if (specialProtectionServices.length === 0) {
      for (let i = 0; i < specialProtectionUnitList.length; i++) {
        await this.createSpecialProtectionServices(specialProtectionUnitList[i]);
      }
    }
    return specialProtectionServices;
  }

  public async createSpecialProtectionServices(specialProtectionData: any): Promise<any> {
    const createSpecialProtectionUnitEntityData: any = await SpecialProtectionUnitEntity.create(specialProtectionData);

    return createSpecialProtectionUnitEntityData;
  }
}

export default SpecialProtectionUnitServices;
