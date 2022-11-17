import { IPossapService } from './../interfaces/possap-services.interfact';
import { IPossapServiceFields } from '../interfaces/possap-services.interfact';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, In, Repository } from 'typeorm';
import { PossapServiceFieldsEntity } from '@entities/service-field.entity';
import { ObjectId } from '@/utils/util';
import PossapService from './possap-services.service';
import { IOfficers } from './../interfaces/officer.interface';
import { OfficerEntity } from '@entities/officers.entity';

@EntityRepository()
class PossapSFService extends Repository<PossapServiceFieldsEntity> {
  public possapS = new PossapService();
  public async findPossapSF(): Promise<IPossapServiceFields[]> {
    const AllPossaps: IPossapServiceFields[] = await PossapServiceFieldsEntity.find();
    console.log(AllPossaps);
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
        const createAllPossapData = await PossapServiceFieldsEntity.save(obj);
        this.distributor(parent, data);
        return createAllPossapData;
      } else {
        throw new HttpException(409, 'Parent service does not exist');
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async distributor(parent: IPossapService, data) {
    switch (parent.slug) {
      case 'cmr':
        this.cmrProcessessor(data);
        break;
      case 'egs':
        this.egsProcessessor(data);
        break;
      case 'pcc':
        this.pccProcessessor(data);
        break;
      case 'pe':
        this.peProcessessor(data);
        break;
      default:
        console.log('slug is not found');
        break;
    }
  }

  public async cmrProcessessor(data) {}
  public async peProcessessor(data) {}
  public async egsProcessessor(data) {}
  public async pccProcessessor(data) {}

  public async updatePossapService(AllPossapId: any, AllPossapData: any): Promise<IPossapServiceFields> {
    if (isEmpty(AllPossapData)) throw new HttpException(400, "You're not AllPossapData");

    const findAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    await PossapServiceFieldsEntity.update(AllPossapId, AllPossapData);

    const updateAllPossap: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    return updateAllPossap;
  }
  public async updateServiceAprrover(AllPossapId: any, AllApproverData: any): Promise<IPossapService> {
    if (isEmpty(AllApproverData)) throw new HttpException(400, "You're not AllOfficerData");

    const findAllPossap: IPossapService = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    const arr = [];
    AllApproverData.forEach(element => {
      arr.push(element.officerId);
    });

    const findAllOfficer: IOfficers[] = await OfficerEntity.find({ where: { id: In([...arr]) } });
    if (findAllOfficer.length != arr.length) throw new HttpException(409, "There's no Officer with that id");

    const updateAllAprovers: IPossapServiceFields = await PossapServiceFieldsEntity.findOne({ where: { id: AllPossapId } });
    return updateAllAprovers;
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
