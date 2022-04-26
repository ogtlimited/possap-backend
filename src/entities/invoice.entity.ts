/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn
} from 'typeorm';
// import {IInvoice} from "@interfaces/invoice.interface";

@Entity()
export class InvoiceEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  amount: number

  @Column()
  application_id: string;

  @Column()
  service_id: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: number;
}
