import { UserEntity } from '@entities/users.entity';
import { IApprovers, IPossapServiceFields } from '@/interfaces/possap-services.interfact';
import { BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, Entity, OneToMany } from 'typeorm';
import { PossapServiceEntity } from './possap-service.entity';

@Entity({
  name: 'possap-service-field',
})
export class PossapServiceFieldsEntity extends BaseEntity implements IPossapServiceFields {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ref: string;

  @ManyToOne(() => PossapServiceEntity, service => service.services)
  service: PossapServiceEntity;

  @Column({
    type: 'jsonb',
  })
  formFields: [];

  @Column({ type: 'enum', enum: ['pending', 'in progress', 'approved'], default: 'pending' })
  status: string;

  @Column()
  approvalLevel: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  approvingOfficers: IApprovers[];

  @ManyToOne(() => UserEntity, user => user.service, { cascade: true })
  owner: UserEntity;
}
