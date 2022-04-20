/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { User } from '@interfaces/users.interface';
import {CommandAccessEntity} from "@entities/commandAccess.entity";
import {PoliceExtractEntity} from "@entities/police_extract.entity";
export enum UserType {
  INDIVIDUAL = 'Individual',
  CorporateNGOs = 'Corporate/NGOs',
  MDAs = 'MDAs',
}
export enum IDENTIFICATIONType {
  NIN = 'National Identification Number',
  DRIVERLICENSE = 'Driver\"s License',
  INTPASSPORT = 'INTERNATIONAL PASSPORT',
  BVN = 'Bank Verification Number',
}
@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Unique(['email'])
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  identificationNumber: string;

  @Column({
    type: 'enum',
    enum: IDENTIFICATIONType,
    default: IDENTIFICATIONType.NIN,
  })
  @IsNotEmpty()
  identificationType: string;

  @Column()
  @IsNotEmpty()
  phone: string;

  @Column()
  @IsNotEmpty()
  fullName: string;

  @Column()
  @IsNotEmpty()
  state: string;

  @Column()
  @IsNotEmpty()
  lga: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.INDIVIDUAL,
  })
  @IsNotEmpty()
  userType: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.INDIVIDUAL,
  })
  identificationDoc?: string;

  @Column()
  @IsNotEmpty()
  address: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

}
