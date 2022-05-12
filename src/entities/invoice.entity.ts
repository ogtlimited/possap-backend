/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn
} from 'typeorm';
import {PaymentStatus} from "@/enums/payment_status.enum";
// import {IInvoice} from "@interfaces/invoice.interface";

//create a one to one relationship with invoice and extracts.
@Entity()
export class InvoiceEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  amount: number

  @Column( {
  type: 'enum',
  enum: PaymentStatus,
  default: 'pending',
})
  status: string;

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
