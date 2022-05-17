import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';
import { IPoliceExtract } from '@interfaces/police_extract.interface';
import { UserType } from '@/enums/user.enum';
import { PaymentStatus } from '@/enums/payment_status.enum';
import { UserEntity } from '@entities/users.entity';

@Entity()
// @Unique(["verification_id"])
export class PoliceExtractEntity extends BaseEntity implements IPoliceExtract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  extract_category: string;

  @Column()
  affidavit_issuance_date: Date;

  @Column()
  @IsNotEmpty()
  wasReported: boolean;

  @Column()
  extractReason: string;

  @Column()
  documentLost: string;
  incident_reported: boolean;

  @Column()
  @IsNotEmpty()
  extract_sub_category: string;

  @Column()
  date_reported: string;

  @Column()
  @IsNotEmpty()
  court_affidavit: string;

  @Column()
  @IsNotEmpty()
  affidavit_number: string;

  @Column()
  @IsNotEmpty()
  extract_police_division_state: string;

  @Column()
  @IsNotEmpty()
  extract_police_division_lga: string;

  @Column({ type: 'enum', enum: ['pending', 'in progress', 'approved'], default: 'pending' })
  @IsNotEmpty()
  status: string;

  @Column({ default: 1 })
  @IsNotEmpty()
  approval_level: number;

  @Column()
  @IsNotEmpty()
  extract_police_division: string;

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

  @ManyToOne(() => UserEntity, user => user.police_extracts)
  user: UserEntity;
}
