/* eslint-disable prettier/prettier */
import { ISpecialProtectionService } from '@/interfaces/helper-interface/special-protection-service-interface';
import {   IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SpecialProtectionServiceEntity extends BaseEntity implements ISpecialProtectionService {
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
    @IsNotEmpty()
    Code: string;

    @Column()
    @IsNotEmpty()
    CommandCategoryId?: number;

    @Column()
    @IsNotEmpty()
    LGAId?: number;

    @Column()
    @IsNotEmpty()
    StateId?: number;

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
    CommandTypeId?: number;

    @Column()
    @IsNotEmpty()
    SelectAllSections?: boolean;

    @Column()
    @IsNotEmpty()
    SelectAllSubSections?: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}