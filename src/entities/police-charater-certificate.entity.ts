import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import {IPoliceExtract} from "@interfaces/police_extract.interface";
export enum UserType {
  INDIVIDUAL = 'Individual',
  CorporateNGOs = 'Corporate/NGOs',
  MDAs = 'MDAs',
}

export enum PaymentStatus {
  pending = 'pending',
  paid = 'paid',
}

@Entity()
// @Unique(["verification_id"])
export class PoliceCharacterEntity extends BaseEntity implements IPoliceExtract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['domestic','international']})
  @IsNotEmpty()
  request_type: string;

  @Column()
  @IsNotEmpty()
  reason_for_inquiry: string;

  @Column()
  @IsNotEmpty()
  state_of_origin: string;

  @Column()
  @IsNotEmpty()
  place_of_birth: string;

  @Column()
  date_of_birth: Date

  @Column()
  @IsNotEmpty()
  destination_country: string;

  @Column()
  passport_number: string;

  @Column()
  place_of_issuance: string;

  @Column()
  date_of_issuance: Date;

  @Column({ type: 'enum', enum: ['yes','no']})
  @IsNotEmpty()
  previously_convicted: string;

  @Column()
  passport_photograph: string;

  @Column()
  international_passport_data_page: string;

  @Column({ type: 'enum', enum: ['pending', 'in progress', 'approved'], default: 'pending' })
  @IsNotEmpty()
  status: string;

  @Column({ default: 1 })
  @IsNotEmpty()
  approval_level: number;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  @IsNotEmpty()
  user_type: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: 'pending',
  })
  @IsNotEmpty()
  payment_status: string;

  @Column({default: "nil"})
  verification_id: string;

  @Column()
  userId: number;

}
