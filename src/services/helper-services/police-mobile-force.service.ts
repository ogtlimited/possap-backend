import { PoliceMobileForceEntity } from '@/entities/helper-entities/police-mobile-force.entity';
import { policeMobileForceList } from '@/factory/police-mobile-force';
import { IPoliceMobileForce } from '@/interfaces/helper-interface/police-mobile-force-interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class PobliceMobileForceServices extends Repository<PoliceMobileForceEntity> {
  constructor() {
    super();
    this.createBulk();
  }
  public async findAllPoliceMobileForceServices(): Promise<IPoliceMobileForce[]> {
    const policeMobileForce: IPoliceMobileForce[] = await PoliceMobileForceEntity.find();
    return policeMobileForce;
  }
  public async createBulk(): Promise<IPoliceMobileForce[]> {
    const policeMobileForce: IPoliceMobileForce[] = await PoliceMobileForceEntity.find();
    if (policeMobileForce.length === 0) {
      for (let i = 0; i < policeMobileForceList.length; i++) {
        await this.createPoliceMobileForceServices(policeMobileForceList[i]);
      }
    }
    return policeMobileForce;
  }

  public async createPoliceMobileForceServices(policeMobileForceData: any): Promise<any> {
    const createPoliceMobileForceEntityData: any = await PoliceMobileForceEntity.create(policeMobileForceData);

    return createPoliceMobileForceEntityData;
  }
}

export default PobliceMobileForceServices;
