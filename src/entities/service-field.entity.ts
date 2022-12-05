import { IApprovalLog } from './../interfaces/possap-services.interfact';
import { UserEntity } from '@entities/users.entity';
import { IApprovers, IPossapServiceFields } from '@/interfaces/possap-services.interfact';
import { BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, Entity, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { PossapServiceEntity } from './possap-service.entity';
import { InvoiceEntity } from './invoice.entity';
import { OfficerAccessEntity } from './officerAccess.entity';

@Entity({
  name: 'possap-service-field',
})
export class PossapServiceFieldsEntity extends BaseEntity implements IPossapServiceFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ref: string;

  @ManyToOne(() => PossapServiceEntity, service => service.services, { eager: true })
  service: PossapServiceEntity;

  @Column({
    type: 'jsonb',
  })
  formFields: [];

  @Column({ type: 'enum', enum: ['pending', 'in progress', 'approved', 'rejected'], default: 'pending' })
  status: string;

  @Column({
    default: null,
  })
  approvalLevel: string;

  @Column({
    default: null,
  })
  processor: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  approvalLog: IApprovalLog[];

  @ManyToOne(() => UserEntity, user => user.service, { cascade: true, eager: true })
  owner: UserEntity;

  @OneToOne(() => InvoiceEntity, invoice => invoice.serviceId, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true, cascade: true })
  @JoinColumn()
  invoice: InvoiceEntity;
}
