import { IsNotEmpty } from 'class-validator';
import {BaseEntity, Entity, Unique, Column, PrimaryColumn} from 'typeorm';
import { IPoliceExtract } from '@interfaces/police_extract.interface';
import { IPoliceCharacterCertificate } from '@interfaces/police_character_cert.interface';
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
export class PoliceCharacterCertificateEntity extends BaseEntity implements IPoliceCharacterCertificate {
  @PrimaryColumn()
  @Unique(['id'])
  id: string;

  @Column({ type: 'enum', enum: ['domestic', 'international'] })
  @IsNotEmpty()
  requestType: string;

  @Column()
  @IsNotEmpty()
  reasonForInquiry: string;

  @Column()
  @IsNotEmpty()
  stateOfOrigin: string;

  @Column()
  @IsNotEmpty()
  placeOfBirth: string;

  @Column()
  @IsNotEmpty()
  dateOfBirth: Date;

  @Column()
  @IsNotEmpty()
  destinationCountry: string;

  @Column()
  passportNumber: string;

  @Column()
  placeOfIssuance: string;

  @Column()
  dateOfIssuance: Date;

  @Column({ type: 'enum', enum: ['yes', 'no'] })
  @IsNotEmpty()
  hasBeenConvicted: string;

  @Column()
  passportPhotograph: string;

  @Column()
  passportBioDataPage: string;

  @Column()
  convictionHistory: string;

  @Column()
  certificateRequestCommand: string;

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

  @Column()
  denial_reason: string;

  @Column()
  police_command: string;

  @Column({ default: 'nil' })
  verification_id: string;

  @Column()
  userId: number;

  @Column()
  state: string;

  @Column()
  lga: string;

  @Column()
  address: string;
}
