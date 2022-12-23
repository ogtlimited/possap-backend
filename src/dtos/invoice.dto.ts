import { IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDTO {
  @IsNumber()
  amount: number;

  @IsString()
  applicationId: number;

  @IsString()
  serviceId: string;

  @IsString()
  status: string;

  @IsNumber()
  userId: number;
}
export class updateInvoiceDTO {
  @IsString()
  status: string;
}
