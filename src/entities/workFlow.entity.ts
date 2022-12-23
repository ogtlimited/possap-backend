import { IWorkflow } from './../interfaces/workflow.interface';
import { PossapServiceEntity } from '@/entities/possap-service.entity';
import { PossapServiceFieldsEntity } from './service-field.entity';

import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column,   OneToMany, ManyToOne } from 'typeorm';
import { WorkFlowApprovalLevelEntity } from './workFlowApprovalLevel.entity';

@Entity()
export class WorkFlowEntity extends sharedProps implements IWorkflow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  name: string;


  @ManyToOne(() => PossapServiceEntity, service => service.workFlow)
  serviceId: PossapServiceFieldsEntity;

  @OneToMany(() => WorkFlowApprovalLevelEntity, workflow => workflow.workFlow, { cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  WorkFlowApprovalLevel: WorkFlowApprovalLevelEntity[];

}
