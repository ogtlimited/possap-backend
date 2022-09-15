import { IPossapService } from './../interfaces/possap-services.interfact';
import { IPossapServiceFields } from '../interfaces/possap-services.interfact';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { PossapServiceFieldsEntity } from '@entities/service-field.entity';
import { ObjectId } from '@/utils/util';
import PossapService from './possap-services.service';

@EntityRepository()
class PossapSFService extends Repository<PossapServiceFieldsEntity> {
  public possapS = new PossapService();
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

  public async createPossapSF(data): Promise<any> {
    if (isEmpty(data)) throw new HttpException(400, 'Data is empty');
    try {
      const ref = ObjectId();
      console.log('service id', data.service);
      const parent: IPossapService = await this.possapS.findPossapServiceById(data.service);
      if (parent) {
        const obj = {
          ...data,
          ref,
          approvalLevel: parent.approvalWorkFlow[0],
        };
        const createAllPossapData = await PossapServiceFieldsEntity.create(obj).save();

        return createAllPossapData;
      } else {
        throw new HttpException(409, 'Parent service does not exist');
      }
    } catch (error) {
      console.log(error);
    }
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
