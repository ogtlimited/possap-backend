import { IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

export class SmsHelperDto {
  @MaxLength(11, {
    message: 'Phone number must be 11 digit',
  })
  @Matches('^[0][0-9]{0,11}$', '', {
    message: 'Phone number must be a valid Nigeria number starting with 0',
  })
  @MinLength(11, { message: 'Phone number must be 11 digit' })
  @IsNotEmpty({ message: 'Phone number should not be empty' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsOptional()
  code: string;
}
