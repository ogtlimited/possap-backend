import { IExtractApprovalLevel, ICharacterCertApprovalLevel, IEGSApprovalLevel } from '@/interfaces/officer.interface';
import { IsObject, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateOfficerDto {
  @IsString()
  public apNumber: string;

  @IsBoolean()
  public useServiceNum: boolean;

  @IsString()
  public fullName: string;

  @IsString()
  public userName: string;

  @IsString()
  public email: string;

  @IsString()
  public phoneNumber: string;

  @IsString()
  public officerFormation: string;

  @IsString()
  public officerDeptartment: string;

  @IsString()
  public officerSection: string;

  @IsString()
  public officerSubSection: string;

  @IsString()
  public role: string;

  @IsString()
  public accessType: string;

  @IsString()
  public service: string;

  @IsObject()
  @IsOptional()
  extractApprovalLevel: IExtractApprovalLevel;

  @IsObject()
  @IsOptional()
  characterCertApprovalLevel: ICharacterCertApprovalLevel;

  @IsObject()
  @IsOptional()
  eGSApprovalLevel: IEGSApprovalLevel;
}