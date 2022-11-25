import { IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDTO {
  @IsNumber()
  amount: number;

  @IsString()
  applicationId: string;

  @IsString()
  serviceId: string;

  @IsString()
  status: string;

  @IsNumber()
  userId: number;
}
