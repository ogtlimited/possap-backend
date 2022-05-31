import { IsEnum,  IsOptional, IsString } from 'class-validator';
import { UserType } from '@/enums/user.enum';
import { IPoliceCharacterCertificate } from '@interfaces/police_character_cert.interface';
import {
  PoliceCharacterCertificateReasonForEnquiryEnum,
  PoliceCharacterCertificateRequestTypeEnum
} from "@/enums/pcc.enums";

export class CreatePoliceCharacterCertificateDTO implements IPoliceCharacterCertificate {
  @IsString()
  @IsEnum(PoliceCharacterCertificateRequestTypeEnum)
  requestType: string;

  @IsString()
  @IsEnum(PoliceCharacterCertificateReasonForEnquiryEnum)
  reasonForInquiry: string;

  @IsString()
  stateOfOrigin: string;

  @IsString()
  placeOfBirth: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  @IsOptional()
  destinationCountry: string;

  @IsString()
  passportNumber: string;

  @IsString()
  placeOfIssuance: string;

  @IsString()
  dateOfIssuance: string;

  @IsString()
  hasBeenConvicted: string;

  @IsString()
  address: string;

  @IsString()
  lga: string;

  @IsString()
  convictionHistory: string;

  @IsString()
  passportPhotograph: string;

  @IsString()
  passportBioDataPage: string;

  @IsString()
  certificateRequestCommand: string;

  @IsString()
  @IsEnum(UserType)
  userType: string;

  @IsString()
  state: string;

}

export class UpdatePoliceCharacterCertificateDTO {
  @IsString()
  @IsOptional()
  denial_reason: string;

  @IsString()
  comment: string;
}
