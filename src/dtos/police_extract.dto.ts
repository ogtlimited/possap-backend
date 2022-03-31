import { IsEmail, IsOptional, IsString } from 'class-validator';
import {IPoliceExtract} from "@interfaces/police_extract.interface";

export class PoliceExtractDto implements IPoliceExtract{
  @IsString()
  affidavit_number: string;

  @IsString()
  category: string;

  @IsString()
  userType: string;

  @IsString()
  court_affidavit: string;

  @IsString()
  incident_reported: boolean;

  @IsString()
  police_division_area: string;

  @IsString()
  police_division_lga: string;

  @IsString()
  police_division_state: string;

  @IsString()
  sub_category: string;

  @IsString()
  userId: string;
}
