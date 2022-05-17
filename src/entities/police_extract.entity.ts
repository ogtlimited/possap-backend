import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';
import { IPoliceExtract } from '@interfaces/police_extract.interface';
import { UserType } from '@/enums/user.enum';
import { PaymentStatus } from '@/enums/payment_status.enum';

@Entity()
// @Unique(["verification_id"])
export class PoliceExtractEntity extends BaseEntity implements IPoliceExtract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  extractCategory: string;

  @Column()
  affidavitIssuanceDate: Date;

  @Column()
  @IsNotEmpty()
  wasReported: boolean;

  @Column()
  extractReason: string;

  @Column()
  documentLost: string;

  @Column()
  dateReported: string;

  @Column()
  propertyLost: string;

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

  @Column({ type: 'enum', enum: ['pending', 'in progress', 'approved'], default: 'pending' })
  @IsNotEmpty()
  status: string;

  @Column({ default: 1 })
  @IsNotEmpty()
  approval_level: number;

  @Column()
  @IsNotEmpty()
  extractPoliceDivision: string;

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

  @Column({ default: 'nil' })
  verification_id: string;

  @Column()
  userId: number;
}
