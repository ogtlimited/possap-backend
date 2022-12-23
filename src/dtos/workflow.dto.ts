import { IsAlphanumeric, IsNumber, IsString } from 'class-validator';

export class CreateWorkFlowDTO {
  @IsNumber()
  serviceId: number;

  @IsString()
  name: string;
}
export class CreateWorkFlowApprovalLevelDTO {
  @IsAlphanumeric()
  workflow: any;

  @IsString()
  name: string;
}
export class updateWorkFlowDTO {
  @IsString()
  name: string;

  @IsNumber()
  serviceId: number;
}
