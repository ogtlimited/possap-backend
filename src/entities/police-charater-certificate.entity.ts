import { IsNotEmpty } from 'class-validator';
import {BaseEntity, Entity, Unique, Column, PrimaryColumn, ManyToOne} from 'typeorm';
import {IPoliceCharacterApprover, IPoliceCharacterCertificate} from '@interfaces/police_character_cert.interface';
import {UserEntity} from "@entities/users.entity";
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

  @Column({ type: 'enum', enum: ['Domestic', 'International'] })
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
  dateOfBirth: string;

  @Column({
    nullable:true
  })
  destinationCountry: string;

  @Column()
  passportNumber: string;

  @Column()
  placeOfIssuance: string;

  @Column()
  dateOfIssuance: string;

  @Column({ type: 'enum', enum: ['yes', 'no'] })
  @IsNotEmpty()
  hasBeenConvicted: string;

  @Column()
  passportPhotograph: string;

  @Column()
  passportBioDataPage: string;

  @Column({
    nullable:true
  })
  convictionHistory: string;

  @Column()
  certificateRequestCommand: string;

  @Column({ type: 'enum', enum: ['pending', 'in progress', 'approved', 'rejected'], default: 'pending' })
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
  userType: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: 'pending',
  })
  @IsNotEmpty()
  paymentStatus: string;

  @Column({ default: 'nil' })
  denialReason: string;

  @Column({ default: 'nil' })
  verificationId: string;

  @Column()
  state: string;

  @Column()
  lga: string;

  @Column()
  address: string;

  @Column({type: 'jsonb', nullable:true})
  approvalInfo: IPoliceCharacterApprover

  @ManyToOne(() => UserEntity, user => user.police_extracts)
  user: UserEntity

}
