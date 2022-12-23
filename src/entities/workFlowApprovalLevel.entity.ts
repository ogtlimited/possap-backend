import { IWorkflowApprovalLevel } from './../interfaces/workflow.interface';
import { WorkFlowEntity } from './workFlow.entity';

import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class WorkFlowApprovalLevelEntity extends sharedProps implements IWorkflowApprovalLevel {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => WorkFlowEntity, wk => wk.WorkFlowApprovalLevel)
  workFlow: WorkFlowEntity;


}
