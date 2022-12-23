import { OfficerEntity } from '@entities/officers.entity';
import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne} from 'typeorm';


export type ServiceType = 'POLICE EXTRACT' | 'ESCORT AND GUARD SERVICES' | 'POLICE CHARACTER CERTIFICATE';
@Entity()
export class OfficerProfileEntity extends sharedProps  {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  officerFormation: string;

  @Column()
  officerDepartment: string;

  @Column()
  @IsNotEmpty()
  officerSection: string;

  @Column()
  officerSubSection: string;


  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => OfficerEntity, user => user.profile)
  officer: OfficerEntity;
}
