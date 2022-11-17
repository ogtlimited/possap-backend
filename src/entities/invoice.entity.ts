import { PossapServiceFieldsEntity } from './service-field.entity';

import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { IInvoice } from '@/interfaces/invoice.interface';

@Entity()
export class InvoiceEntity extends sharedProps implements IInvoice {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsNotEmpty()
  serviceCost: string;

  @Column()
  @IsNotEmpty()
  status: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => PossapServiceFieldsEntity, service => service.invoice)
  serviceId: PossapServiceFieldsEntity;
}
