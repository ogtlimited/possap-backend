import { IsOptional, IsString, IsArray } from 'class-validator';
import { IPoliceExtract } from '@interfaces/police_extract.interface';

export class PoliceExtractDto implements IPoliceExtract {
  @IsString()
  affidavit_number: string;

  @IsString()
  extract_category: string;

  @IsString()
  extract_sub_category: string;

  @IsString()
  user_type: string;

  @IsString()
  court_affidavit: string;

  @IsString()
  affidavit_issuance_date: string;

  @IsString()
  incident_reported: boolean;

  @IsString()
  date_reported: string;

  @IsString()
  extract_police_division: string;

  @IsString()
  extract_police_division_lga: string;

  @IsString()
  extract_police_division_state: string;
}

export class UpdatePoliceExtractDto implements IPoliceExtract {
  @IsString()
  @IsOptional()
  rejection_reason: string;
}
