import { IsNotEmpty } from 'class-validator';
import {BaseEntity, Entity,  Column, Unique, ManyToOne, PrimaryColumn} from 'typeorm';
import { IPoliceExtract } from '@interfaces/police_extract.interface';
import { UserType } from '@/enums/user.enum';
import { PaymentStatus } from '@/enums/payment_status.enum';
import { UserEntity } from '@entities/users.entity';

@Entity()
// @Unique(["verification_id"])
export class PoliceExtractEntity extends BaseEntity implements IPoliceExtract {
  @PrimaryColumn()
  @Unique(['id'])
  id: string;

  @Column()
  @IsNotEmpty()
  extractCategory: string;

  @Column()
  affidavitIssuanceDate: Date;

  @Column()
  @IsNotEmpty()
  wasReported: boolean;

  // @Column()
  // extractReason: string;

  @Column()
  documentLost: string;
  incident_reported: boolean;

  @Column()
  propertyLost: string;

  @Column()
  extractSubcategory: string;

  @Column()
  dateReported: string;

  @Column()
  @IsNotEmpty()
  courtAffidavit: string;

  @Column()
  @IsNotEmpty()
  affidavitNumber: string;

  @Column()
  @IsNotEmpty()
  extractState: string;

  @Column()
  @IsNotEmpty()
  extractLga: string;

  // Hash enum are better using when using postgres
  @Column({ type: 'enum', enum: ['pending', 'in progress', 'approved'], default: 'pending' })
  @IsNotEmpty()
  status: string;

  @Column({ default: 1 })
  @IsNotEmpty()
  approvalLevel: number;

  @Column()
  @IsNotEmpty()
  extractPoliceDivision: string;

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
  verificationId: string;

  @ManyToOne(() => UserEntity, user => user.police_extracts)
  user: UserEntity
  ;
}
