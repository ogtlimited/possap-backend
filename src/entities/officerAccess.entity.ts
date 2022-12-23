import { OfficerEntity } from '@entities/officers.entity';
import { PossapServiceEntity } from './possap-service.entity';
import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';

@Entity()
export class OfficerAccessEntity extends sharedProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @IsNotEmpty()
  accessType: string;

  // @ManyToMany(() => PossapServiceEntity, {cascade: true})
  // @JoinTable()
  @Column({type: 'json'})
  services: string[];

  @Column({type: 'simple-array', default: null})
  canApprove: string[];



  @OneToOne(type => OfficerEntity, user => user.access)
  officer: OfficerEntity;
}
