import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
} from 'typeorm';
import {IPoliceExtract} from "@interfaces/police_extract.interface";
import {UserType} from "@/enums/user.enum";
import {PaymentStatus} from "@/enums/payment_status.enum";

@Entity()
// @Unique(["verification_id"])
export class PoliceExtractEntity extends BaseEntity implements IPoliceExtract {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNotEmpty()
  category: string;

  @Column()
  affidavit_date_of_issuance: Date

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

  @Column({ type: 'enum', enum: ['pending', 'in progress', 'approved'], default: 'pending' })
  @IsNotEmpty()
  status: string;

  @Column({ default: 1 })
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
    default: 'pending',
  })
  @IsNotEmpty()
  payment_status: string;

  @Column({default: "nil"})
  verification_id: string;

  @Column()
  userId: number;
}
