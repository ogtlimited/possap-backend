import { IWorkflowApprovalLevel } from './../interfaces/workflow.interface';
import { WorkFlowApprovalLevelEntity } from './../entities/workFlowApprovalLevel.entity';
import { Entity, Repository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { v4 as uuidv4 } from 'uuid';
import PossapSFService from './possap-sf.service';
import { CreateWorkFlowApprovalLevelDTO } from '@/dtos/workflow.dto';

//factor pagination
@Entity()
class WorkFlowApprovalLevelService extends Repository<WorkFlowApprovalLevelEntity> {
  public async findAllUserworkFlowApprovalLevels(user, queryParams): Promise<IWorkflowApprovalLevel[]> {
    queryParams.userId = user.id;
    const workFlowApprovalLevels: IWorkflowApprovalLevel[] = await WorkFlowApprovalLevelEntity.find(queryParams);
    return workFlowApprovalLevels;
  }

  public async findAllworkFlowApprovalLevels(queryParams): Promise<IWorkflowApprovalLevel[]> {
    const workFlowApprovalLevels: IWorkflowApprovalLevel[] = await WorkFlowApprovalLevelEntity.find(queryParams);
    return workFlowApprovalLevels;
  }

  public async getworkFlowApprovalLevel(id): Promise<IWorkflowApprovalLevel> {
    const workFlowApprovalLevel: IWorkflowApprovalLevel = await WorkFlowApprovalLevelEntity.findOne({ where: { id: id } });
    return workFlowApprovalLevel;
  }
  public async updateworkFlowApprovalLevel(id, status): Promise<IWorkflowApprovalLevel> {
    const workFlowApprovalLevel: IWorkflowApprovalLevel = await WorkFlowApprovalLevelEntity.findOne({ where: { id: id } });
    if (!workFlowApprovalLevel) throw new HttpException(404, 'workFlowApprovalLevel not found');
    await WorkFlowApprovalLevelEntity.update(id, status);
    const update: IWorkflowApprovalLevel = await WorkFlowApprovalLevelEntity.findOne({ where: { id: id } });

    return update;
  }

  public async createworkFlowApprovalLevel(payload: any): Promise<IWorkflowApprovalLevel> {
    const newworkFlowApprovalLevel: IWorkflowApprovalLevel = payload;
    newworkFlowApprovalLevel.id = await uuidv4(6);
    const createworkFlowApprovalLevelData = await WorkFlowApprovalLevelEntity.create(newworkFlowApprovalLevel).save();
    return createworkFlowApprovalLevelData;
  }
}

export default WorkFlowApprovalLevelService;
