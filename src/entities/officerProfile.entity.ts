import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { ICharacterCertApprovalLevel, IEGSApprovalLevel, IExtractApprovalLevel, IOfficers } from '../interfaces/officer.interface';
import { CommandAccessEntity } from './commandAccess.entity';

export type ServiceType = 'POLICE EXTRACT' | 'ESCORT AND GUARD SERVICES' | 'POLICE CHARACTER CERTIFICATE';
@Entity({
  name: 'officer-profile'
})
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



  @OneToMany(() => CommandAccessEntity, (command) => command.officer, {onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true, cascade: true})
  commandAccess: CommandAccessEntity[]
}
