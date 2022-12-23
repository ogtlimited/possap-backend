import { CreateWorkFlowDTO } from './../dtos/workflow.dto';
import { IWorkflow } from './../interfaces/workflow.interface';
import { Entity, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { WorkFlowEntity } from '@entities/workFlow.entity';
import { v4 as uuidv4 } from 'uuid';

//factor pagination
@Entity()
class WorkFlowService extends Repository<WorkFlowEntity> {
  public async findAllworkFlow(user, queryParams): Promise<IWorkflow[]> {
    queryParams.userId = user.id;
    const workFlow: IWorkflow[] = await WorkFlowEntity.find(queryParams);
    return workFlow;
  }

  public async findworkFlow(queryParams): Promise<IWorkflow[]> {
    const workFlow: IWorkflow[] = await WorkFlowEntity.find(queryParams);
    return workFlow;
  }

  public async getworkFlow(id): Promise<IWorkflow> {
    const workFlow: IWorkflow = await WorkFlowEntity.findOne({ where: { id: id } });
    return workFlow;
  }
  public async updateworkFlow(id, status): Promise<IWorkflow> {
    const workFlow: IWorkflow = await WorkFlowEntity.findOne({ where: { id: id } });
    if (!workFlow) throw new HttpException(404, 'workFlow not found');
    await WorkFlowEntity.update(id, status);
    const update: IWorkflow = await WorkFlowEntity.findOne({ where: { id: id } });

    return update;
  }

  public async createworkFlow(payload: CreateWorkFlowDTO): Promise<IWorkflow> {
    const newworkFlow: IWorkflow = payload;
    newworkFlow.id = await uuidv4(6);
    const createworkFlowData = await WorkFlowEntity.create(newworkFlow).save();
    return createworkFlowData;
  }
}

export default WorkFlowService;
