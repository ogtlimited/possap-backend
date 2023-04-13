import { CreatePossapServiceDto } from './../dtos/possap-service.dto';
import { IPossapService } from './../interfaces/possap-services.interfact';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { PossapServiceEntity } from '@/entities/possap-service.entity';
import WorkFlowService from './workflow.service';

@EntityRepository()
class PossapService extends Repository<PossapServiceEntity> {
  public workFlowS = new WorkFlowService();
  public async findPossapServices(): Promise<IPossapService[]> {
    const AllPossaps: IPossapService[] = await PossapServiceEntity.find();
    return AllPossaps;
  }
  public async getServiceCharge(serviceId: any): Promise<any> {
    if (isEmpty(serviceId)) throw new HttpException(400, 'Provide service id');

    return {
      invoiceAmount: 3000,
      proccessingFee: 1000,
    };
  }

  public async findPossapServiceById(AllPossapId: any): Promise<IPossapService> {
    try {
      if (isEmpty(AllPossapId)) throw new HttpException(400, 'no data passed');
      console.log(AllPossapId, 'id');
      const findAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { id: AllPossapId } });
      if (!findAllPossap) throw new HttpException(409, 'Service does not exist');

      return findAllPossap;
    } catch (error) {
      throw new HttpException(400, error);
    }
  }

  public async createPossapService(AllPossapData): Promise<IPossapService> {
    if (isEmpty(AllPossapData)) throw new HttpException(400, "You're not AllPossapData");

    const findAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { name: AllPossapData.name } });
    // console.log(findAllPossap, 'exist');
    if (findAllPossap) throw new HttpException(409, `service with this name ${AllPossapData.name} already exists`);
    // console.log(AllPossapData);
    // console.log(AllPossapData.workFlow);
    // const { workflow, ...others } = AllPossapData;
    const createAllPossapData: IPossapService = await PossapServiceEntity.save(AllPossapData);
    // const addWorkFlow = await this.workFlowS.createworkFlow({ serviceId: createAllPossapData.id, ...workflow });
    // createAllPossapData.workflow = addWorkFlow.id;
    // const update = await this.updatePossapService(createAllPossapData.id, createAllPossapData);
    // console.log(update, 'update');

    return createAllPossapData;
  }

  public async updatePossapService(AllPossapId: any, AllPossapData: any): Promise<IPossapService> {
    if (isEmpty(AllPossapData)) throw new HttpException(400, "You're not AllPossapData");
    console.log('continue');
    const findAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    await PossapServiceEntity.update(AllPossapId, AllPossapData);

    const updateAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { id: AllPossapId } });
    return updateAllPossap;
  }

  public async deletePossapService(AllPossapId: string): Promise<IPossapService> {
    if (isEmpty(AllPossapId)) throw new HttpException(400, "You're not AllPossapId");

    const findAllPossap: IPossapService = await PossapServiceEntity.findOne({ where: { id: AllPossapId } });
    if (!findAllPossap) throw new HttpException(409, "You're not AllPossap");

    await PossapServiceEntity.delete({ id: AllPossapId });
    return findAllPossap;
  }
}

export default PossapService;
