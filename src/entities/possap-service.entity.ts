import { PossapServiceFieldsEntity } from './service-field.entity';
import { IPossapService } from '../interfaces/possap-services.interfact';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'possap-service',
})
export class PossapServiceEntity extends BaseEntity implements IPossapService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array')
  approvalWorkFlow: string[];

  @OneToMany(() => PossapServiceFieldsEntity, service => service.service)
  services: PossapServiceFieldsEntity[];

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  formSchema: [];
}
