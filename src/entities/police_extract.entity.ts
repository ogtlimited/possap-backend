import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '@interfaces/users.interface';
import {IPoliceExtract} from "@interfaces/police_extract.interface";
export enum UserType {
  INDIVIDUAL = 'Individual',
  CorporateNGOs = 'Corporate/NGOs',
  MDAs = 'MDAs',
}

@Entity()
export class PoliceExtractEntity extends BaseEntity implements IPoliceExtract {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  // @Unique(['email'])
  userId: string;

  @Column()
  @IsNotEmpty()
  category: string;


  @Column()
  @IsNotEmpty()
  incident_reported: boolean;

  @Column()
  @IsNotEmpty()
  sub_category: string;


  @Column()
  @IsNotEmpty()
  court_affidavit: string;

  @Column()
  @IsNotEmpty()
  affidavit_number: string;

  @Column()
  @IsNotEmpty()
  police_division_state: string;

  @Column()
  @IsNotEmpty()
  police_division_lga: string;

  @Column()
  @IsNotEmpty()
  police_division_area: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  @IsNotEmpty()
  userType: string;

}
