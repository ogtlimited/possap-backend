import { IsOptional, IsString, IsArray } from 'class-validator';
import { IPoliceExtract } from '@interfaces/police_extract.interface';

export class PoliceExtractDto implements IPoliceExtract {
  @IsString()
  affidavitNumber: string;

  @IsArray()
  extractCategory: string;

  @IsArray()
  documentLost: string;

  @IsArray()
  propertyLost: string;

  @IsString()
  user_type: string;

  @IsString()
  courtAffidavit: string;

  @IsString()
  affidavitIssuanceDate: string;

  @IsString()
  wasReported: boolean;

  @IsString()
  dateReported: string;

  @IsString()
  extractPoliceDivision: string;

  @IsString()
  extractLga: string;

  @IsString()
  extractState: string;

  @IsString()
  extractReason: string;
}

export class UpdatePoliceExtractDto implements IPoliceExtract {
  @IsString()
  @IsOptional()
  rejection_reason: string;
}
