import { CreatePossapFieldServiceDto } from '../dtos/possap-service.dto';
import { IPossapServiceFields } from '../interfaces/possap-services.interfact';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { PossapServiceFieldsEntity } from '@/entities/service.entity';

@EntityRepository()
class PossapSFService extends Repository<PossapServiceFieldsEntity> {
  public async findPossapSF(): Promise<IPossapServiceFields[]> {
    const AllPossaps: IPossapServiceFields[] = await PossapServiceFieldsEntity.find();
    return AllPossaps;
  }

  public async findAPossapSFById(AllPossapId: any): Promise<IPossapServiceFields> {
    if (isEmpty(AllPossapId)) throw new HttpException(400, "You're not AllPossapId");

    const findAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    return findAllPossap;
  }

  public async createPossapSF(AllPossapData): Promise<IPossapServiceFields> {
    if (isEmpty(AllPossapData)) throw new HttpException(400, "You're not AllPossapData");

    const findAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { name: AllPossapData.name } });
    if (findAllPossap) throw new HttpException(409, `service with this name ${AllPossapData.name} already exists`);
    const createAllPossapData: IPossapServiceFields = await PossapServiceFieldsEntity.create(AllPossapData).save();

    return createAllPossapData;
  }

  public async updatePossapService(AllPossapId: any, AllPossapData: any): Promise<IPossapServiceFields> {
    if (isEmpty(AllPossapData)) throw new HttpException(400, "You're not AllPossapData");

    const findAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    await PossapServiceFieldsEntity.update(AllPossapId, AllPossapData);

    const updateAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    return updateAllPossap;
  }

  public async deleteAllPossap(AllPossapId: number): Promise<IPossapServiceFields> {
    if (isEmpty(AllPossapId)) throw new HttpException(400, "You're not AllPossapId");

    const findAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    await PossapServiceFieldsEntity.delete({ id: AllPossapId });
    return findAllPossap;
  }
}

export default PossapSFService;
