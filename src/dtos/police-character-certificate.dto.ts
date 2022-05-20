import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserType } from '@/enums/user.enum';
import { IPoliceCharacterCertificate } from '@interfaces/police_character_cert.interface';
import { Column } from 'typeorm';

export class CreatePoliceCharacterCertificateDTO implements IPoliceCharacterCertificate {
  @IsString()
  id: string;

  @IsString()
  requestType: string;

  @IsString()
  reasonForInquiry: string;

  @IsString()
  stateOfOrigin: string;

  @IsString()
  placeOfBirth: string;

  @IsDate()
  dateOfBirth: Date;

  @IsString()
  destinationCountry: string;

  @IsString()
  passportNumber: string;

  @IsString()
  placeOfIssuance: string;

  @IsDate()
  dateOfIssuance: Date;

  @IsString()
  hasBeenConvicted: string;

  @IsString()
  convictionHistory: string;

  @IsString()
  passportPhotograph: string;

  @IsString()
  passportBioDataPage: string;

  @IsString()
  certificateRequestCommand: string;

  @IsString()
  status: string;

  @IsString()
  @IsEnum(UserType)
  user_type: string;

  @IsString()
  payment_status: string;

  @IsString()
  verification_id: string;

  @IsNumber()
  userId: number;

  @IsString()
  state: string;

  @IsString()
  lga: string;

  @IsString()
  address: string;

  @IsString()
  police_command: string;
}

export class UpdatePoliceCharacterCertificateDTO {
  @IsString()
  denial_reason: string;
}
