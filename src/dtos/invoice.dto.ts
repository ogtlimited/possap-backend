import {IsNumber, IsString} from 'class-validator';

export class CreateInvoiceDTO {
  @IsNumber()
  amount: number

  @IsString()
  application_id: string;

  @IsNumber()
  service_id: number;

  @IsNumber()
  userId: number;
}
