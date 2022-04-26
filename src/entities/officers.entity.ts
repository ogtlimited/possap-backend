import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ICharacterCertApprovalLevel, IEGSApprovalLevel, IExtractApprovalLevel, IOfficers } from './../interfaces/officer.interface';
import { CommandAccessEntity } from './commandAccess.entity';

export type ServiceType = 'POLICE EXTRACT' | 'ESCORT AND GUARD SERVICES' | 'POLICE CHARACTER CERTIFICATE';
@Entity()
export class OfficerEntity extends sharedProps implements IOfficers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  apNumber: string;

  @Column()
  useServiceNum: boolean;

  @Column()
  @IsNotEmpty()
  fullName: string;

  @Column()
  @IsNotEmpty()
  userName: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  phoneNumber: string;

  @Column()
  @IsNotEmpty()
  officerFormation: string;

  @Column()
  @IsNotEmpty()
  officerDepartment: string;

  @Column()
  @IsNotEmpty()
  officerSection: string;

  @Column()
  @IsNotEmpty()
  officerSubSection: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  accessType: string;

  @Column({
    type: 'simple-array'
  })
  @IsNotEmpty()
  service: any[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column('simple-json', {nullable: true})
  extractApprovalLevel: IExtractApprovalLevel;

  @Column('simple-json', {nullable: true})
  characterCertApprovalLevel: ICharacterCertApprovalLevel;

  @Column('simple-json', {nullable: true})
  eGSApprovalLevel: IEGSApprovalLevel;

  @OneToMany(() => CommandAccessEntity, (command) => command.officer, {onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true, cascade: true})
  commandAccess: CommandAccessEntity[]
}
