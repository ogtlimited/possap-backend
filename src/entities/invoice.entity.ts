import { PaymentStatus } from './../enums/payment_status.enum';
import { PossapServiceFieldsEntity } from './service-field.entity';

import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { IInvoice } from '@/interfaces/invoice.interface';

@Entity()
export class InvoiceEntity extends sharedProps implements IInvoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  amount: number;

  @Column( {
    type: 'enum',
    enum: PaymentStatus,
    default: 'pending',
  })
    status: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  applicationId: string;

  @OneToOne(() => PossapServiceFieldsEntity, service => service.invoice)
  serviceId: PossapServiceFieldsEntity;

  @Column()
  userId: number;
}
