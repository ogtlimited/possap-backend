import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreatePossapServiceDto {
  @IsString()
  public name: string;
}
export class CreatePossapFieldServiceDto {
  @IsString()
  public name: string;

  public serviceId: any;

  @IsArray()
  public formFields: [];
}
