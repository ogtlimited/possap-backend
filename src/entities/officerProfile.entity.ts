import { OfficerEntity } from '@entities/officers.entity';
import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne} from 'typeorm';


export type ServiceType = 'POLICE EXTRACT' | 'ESCORT AND GUARD SERVICES' | 'POLICE CHARACTER CERTIFICATE';
@Entity()
export class OfficerProfileEntity extends sharedProps  {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  officerFormation: string;

  @Column()
  officerDepartment: string;

  @Column()
  @IsNotEmpty()
  officerSection: string;

  @Column()
  @IsNotEmpty()
  officerSubSection: string;


  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(type => OfficerEntity, user => user.profile)
  officer: OfficerEntity;
}
