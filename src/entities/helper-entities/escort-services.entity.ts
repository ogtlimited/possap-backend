/* eslint-disable prettier/prettier */

import { IEscortServices } from '@/interfaces/helper-interface/escort-services-interface';
import {   IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class EscortServicesEntity extends BaseEntity implements IEscortServices {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    @IsNotEmpty()
    ParentId: number;

    @Column()
    @IsNotEmpty()
    Name: string;

    @Column()
    @IsNotEmpty()
    ParentName?: any;

    @Column()
    @IsNotEmpty()
    MinimumRequiredOfficers: number;

    @Column()
    @IsNotEmpty()
    ShowExtraFields: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}