import { IPossapServiceFields } from '@/interfaces/possap-services.interfact';
import { BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { PossapServiceEntity } from './service.entity';

export class PossapServiceFieldsEntity extends BaseEntity implements IPossapServiceFields {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PossapServiceEntity, service => service.services)
  serviceId: PossapServiceEntity;

  @Column({
    type: 'jsonb',
  })
  formFields: [];
}
