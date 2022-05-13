import { IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDTO {
  @IsNumber()
  amount: number;

  @IsString()
  application_id: string;

  @IsString()
  service_id: string;

  @IsNumber()
  userId: number;
}
