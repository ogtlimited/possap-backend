import { IOfficers } from '@interfaces/officer.interface';
import { OfficerAccessEntity } from './officerAccess.entity';
import { OfficerProfileEntity } from './officerProfile.entity';

import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import {  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinTable, ManyToMany, JoinColumn, OneToOne } from 'typeorm';
import { CommandAccessEntity } from './commandAccess.entity';

export type ServiceType = 'POLICE EXTRACT' | 'ESCORT AND GUARD SERVICES' | 'POLICE CHARACTER CERTIFICATE';
@Entity({
  name: 'officer'
})
export class OfficerEntity extends sharedProps implements IOfficers {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  apNumber: string;

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
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => OfficerProfileEntity)
  @JoinColumn()
  profile: OfficerProfileEntity

  @OneToOne(() => OfficerAccessEntity)
  @JoinColumn()
  access: OfficerAccessEntity


  @OneToMany(() => CommandAccessEntity, (command) => command.officer, {onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true, cascade: true})
  commandAccess: CommandAccessEntity[]
}
