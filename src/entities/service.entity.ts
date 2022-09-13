import { PossapServiceFieldsEntity } from './service.entity';
import { IPossapService } from './../interfaces/possap-services.interfact';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'possap-service',
})
export class PossapServiceEntity extends BaseEntity implements IPossapService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PossapServiceFieldsEntity, service => service.serviceId)
  services: PossapServiceFieldsEntity[];
}
