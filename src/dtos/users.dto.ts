import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

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
  @IsOptional()
  public gender: string;

  @MaxLength(11, {
    message: 'Phone number must be 11 digit',
  })
  @Matches('^[0][0-9]{0,11}$', '', {
    message: 'Phone number must be a valid Nigeria number starting with 0',
  })
  @MinLength(11, { message: 'Phone number must be 11 digit' })
  @IsNotEmpty({ message: 'Phone number should not be empty' })
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
