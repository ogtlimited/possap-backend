import {IsDate, IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';
import {UserType} from "@/enums/user.enum";
import {IPoliceCharacterCertificate} from "@interfaces/police_character_cert.interface";
import {Column} from "typeorm";

export class CreatePoliceCharacterCertificateDTO implements IPoliceCharacterCertificate {
  @IsString()
  id: string;

  @IsString()
  request_type: string;

  @IsString()
  reason_for_inquiry: string;

  @IsString()
  state_of_origin: string;

  @IsString()
  place_of_birth: string;

  @IsDate()
  date_of_birth: Date

  @IsString()
  destination_country: string;

  @IsString()
  passport_number: string;

  @IsString()
  place_of_issuance: string;

  @IsDate()
  date_of_issuance: Date;

  @IsString()
  previously_convicted: string;

  @IsString()
  passport_photograph: string;

  @IsString()
  international_passport_data_page: string;

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
