import { WorkFlowEntity } from './workFlow.entity';
import { PossapServiceFieldsEntity } from './service-field.entity';
import { IPossapService } from '../interfaces/possap-services.interfact';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'possap-service',
})
export class PossapServiceEntity extends BaseEntity implements IPossapService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @OneToMany(() => WorkFlowEntity, workflow => workflow.serviceId, { cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  workFlow: WorkFlowEntity[];

  @OneToMany(() => PossapServiceFieldsEntity, service => service.service)
  services: PossapServiceFieldsEntity[];

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  formSchema: [];
}
