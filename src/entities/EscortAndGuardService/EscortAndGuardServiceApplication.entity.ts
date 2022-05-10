import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EscortAndGuardServiceApplication } from '@interfaces/EscortAndGuardServiceApplication/EscortAndGuardServiceApplication.interface';

export enum PaymentMethod {
  ONE_OFF = 'one_off',
  MONTHLY = 'monthly',
}

@Entity()
export class EscortAndGuardServiceApplicationEntity extends BaseEntity implements EscortAndGuardServiceApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  userId: number;

  @Column()
  @IsNotEmpty()
  serviceCategory: string;

  @Column()
  @IsNotEmpty()
  categoryType: string;

  @Column()
  @IsNotEmpty()
  unit: string;

  @Column()
  @IsNotEmpty()
  tacticalSquad: string;

  @Column()
  @IsNotEmpty()
  commandFormation: string;

  @Column()
  @IsNotEmpty()
  originState: string;

  @Column()
  @IsNotEmpty()
  originLga: string;

  @Column()
  @IsNotEmpty()
  serviceDeliveryState: string;

  @Column()
  @IsNotEmpty()
  serviceDeliveryLga: string;

  @Column()
  escortAddress: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsNotEmpty()
  escortStartDate: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @IsNotEmpty()
  escortEndDate: Date;

  @Column()
  @IsNotEmpty()
  serviceSubCategory: string;

  @Column()
  @IsNotEmpty()
  serviceType: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  phone: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  requestType: number;

  @Column()
  @IsNotEmpty()
  address: string;

  @Column({ default: true })
  escortOfficersRequired: boolean;

  // @Column({
  //   type: 'enum',
  //   enum: PaymentMethod,
  // })
  // invoicePaymentMethod: PaymentMethod;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
