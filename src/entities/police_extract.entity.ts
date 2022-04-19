import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, JoinColumn
} from 'typeorm';
import { User } from '@interfaces/users.interface';
import {IPoliceExtract} from "@interfaces/police_extract.interface";
import {OfficerEntity} from "@entities/officers.entity";
import {UserEntity} from "@entities/users.entity";
export enum UserType {
  INDIVIDUAL = 'Individual',
  CorporateNGOs = 'Corporate/NGOs',
  MDAs = 'MDAs',
}

export enum PaymentStatus {
  pending = 'pending',
  paid = 'paid'
}

@Entity()
@Unique(["verification_id"])
export class PoliceExtractEntity extends BaseEntity implements IPoliceExtract {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  @IsNotEmpty()
  category: string;

  @Column({default: "nil"})
  rejection_reason: string;


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

  @Column({type: "enum", enum: ["pending", "in progress", "approved"], default: "pending"})
  @IsNotEmpty()
  status: string;

  @Column({default: 1})
  @IsNotEmpty()
  approval_level: number;

  @Column()
  @IsNotEmpty()
  police_division_area: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  @IsNotEmpty()
  user_type: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: "pending"
  },)
  @IsNotEmpty()
  payment_status: string;

  @Column()
  verification_id: string;

  @ManyToOne(() => UserEntity, (user) => user.policeExtracts)
  user: UserEntity;

}
