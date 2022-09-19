import { CreatePossapServiceDto } from './../dtos/possap-service.dto';
import { IPossapService } from './../interfaces/possap-services.interfact';
import { IOfficers } from './../interfaces/officer.interface';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { PossapServiceEntity } from '@/entities/service.entity';
import { OfficerEntity } from '@entities/officers.entity';

@EntityRepository()
class PossapService extends Repository<PossapServiceEntity> {
  public async findPossapServices(): Promise<IPossapService[]> {
    const AllPossaps: IPossapService[] = await PossapServiceEntity.find();
    return AllPossaps;
  }

  public async findPossapServiceById(AllPossapId: any): Promise<IPossapService> {
    if (isEmpty(AllPossapId)) throw new HttpException(400, "You're not AllPossapId");

    const findAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    return findAllPossap;
  }

  public async createPossapService(AllPossapData): Promise<IPossapService> {
    if (isEmpty(AllPossapData)) throw new HttpException(400, "You're not AllPossapData");

    const findAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { name: AllPossapData.name } });
    if (findAllPossap) throw new HttpException(409, `service with this name ${AllPossapData.name} already exists`);
    const createAllPossapData: IPossapService = await PossapServiceEntity.create(AllPossapData).save();

    return createAllPossapData;
  }

  public async updatePossapService(AllPossapId: any, AllPossapData: any): Promise<IPossapService> {
    if (isEmpty(AllPossapData)) throw new HttpException(400, "You're not AllPossapData");

    const findAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    await PossapServiceEntity.update(AllPossapId, AllPossapData);

    const updateAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { id: AllPossapId } });
    return updateAllPossap;
  }

  public async updateOfficer(AllPossapId: any, AllOfficerData: any): Promise<IPossapService> {
    //[{officerId:1,approvalLevel:"ffh"},{}]
    if (isEmpty(AllOfficerData)) throw new HttpException(400, "You're not AllOfficerData");

    const findAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");
    let updateAllOfficers;
    AllOfficerData.forEach(async obj => {
      if (isEmpty(obj.officerId)) throw new HttpException(400, "There's no Officer Data");
      const findAllOfficer: IOfficers = await OfficerEntity.findOne({ where: { id: obj.officerId } });
      if (!findAllOfficer) throw new HttpException(409, "There's no Officer with that id");
      await OfficerEntity.update(obj.officerId, obj.approvalLevel);
      const updateAllOfficer: IOfficers = await OfficerEntity.findOne({ where: { id: obj.officerId } });
      updateAllOfficers = updateAllOfficer;
    });
    return updateAllOfficers;
  }

  public async deletePossapService(AllPossapId: number): Promise<IPossapService> {
    if (isEmpty(AllPossapId)) throw new HttpException(400, "You're not AllPossapId");

    const findAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    await PossapServiceEntity.delete({ id: AllPossapId });
    return findAllPossap;
  }
}

export default PossapService;
