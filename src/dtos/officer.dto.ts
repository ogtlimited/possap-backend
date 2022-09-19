import { IsObject, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateOfficerDto {
  @IsString()
  public apNumber: string;

  @IsString()
  public fullName: string;

  @IsString()
  public userName: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public phoneNumber: string;

  @IsArray()
  @IsOptional()
  public commandAccess: [];

  @IsObject()
  @IsOptional()
  profile: any;

  @IsObject()
  @IsOptional()
  access: any;
}
