import { IsString, IsBoolean, IsNumber, IsDate, IsDateString } from 'class-validator';
export class CreateEscortAndGuardServiceDto {
  @IsString()
  public serviceCategory: string;

  @IsString()
  public categoryType: string;

  @IsNumber()
  public userId: number;

  @IsString()
  public unit: string;

  @IsString()
  public tacticalSquad: string;

  @IsString()
  public commandFormation: string;

  @IsString()
  public originState: string;

  @IsString()
  public originLga: string;

  @IsString()
  public serviceDeliveryState: string;

  @IsString()
  public serviceDeliveryLga: string;

  @IsString()
  public escortAddress: string;

  @IsDateString()
  public escortStartDate: Date;

  @IsDateString()
  public escortEndDate: Date;

  @IsBoolean()
  public escortOfficersRequired: boolean;

  @IsString()
  public serviceSubCategory: string;

  @IsString()
  public serviceType: string;

  @IsNumber()
  public requestType: number;
}
