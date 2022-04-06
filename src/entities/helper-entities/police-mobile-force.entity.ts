/* eslint-disable prettier/prettier */
 import { IPoliceMobileForce } from '@/interfaces/helper-interface/police-mobile-force-interface';
import {   IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PoliceMobileForceEntity extends BaseEntity implements IPoliceMobileForce {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    @IsNotEmpty()
    Name: string;

    @Column()
    @IsNotEmpty()
    Code?: any;

    @Column()
    @IsNotEmpty()
    CommandCategoryId: number;

    @Column()
    @IsNotEmpty()
    LGAId: number;

    @Column()
    @IsNotEmpty()
    StateId: number;

    @Column()
    @IsNotEmpty()
    LGAName?: any;

    @Column()
    @IsNotEmpty()
    StateName?: any;

    @Column()
    @IsNotEmpty()
    Address?: any;

    @Column()
    @IsNotEmpty()
    CommandTypeId: number;

    @Column()
    @IsNotEmpty()
    SelectAllSections: boolean;

    @Column()
    @IsNotEmpty()
    SelectAllSubSections: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}