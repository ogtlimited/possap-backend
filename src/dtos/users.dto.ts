import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public nin: string;

  @IsString()
  public password: string;

  @IsString()
  @IsOptional()
  public userType: string;

  @IsString()
  public phone: string;

  @IsString()
  public fullName: string;

  @IsString()
  public state: string;

  @IsString()
  public lga: string;

  // @IsString()
  // public identificationType: string;

  // @IsString()
  // public identificationNumber: string;

  // @IsString()
  // @IsOptional()
  // public identificationDoc: string;

  @IsString()
  public address: string;
}
export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
export class UserOTPDto {
  @IsString()
  public otp: string;
}
