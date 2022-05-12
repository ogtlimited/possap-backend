import { User } from '@interfaces/users.interface';
import { PoliceExtractDto } from '@dtos/police_extract.dto';
import { IOfficers } from '@interfaces/officer.interface';

export interface IPoliceExtract {
  id?: string;
  userId?: any;
  userType?: string;
  extractCategory?: string;
  // sub_category?: string;
  documentLost?: string;
  propertyLost?: string;
  dateReported?: string;
  wasReported?: boolean;
  courtAffidavit?: string;
  affidavitNumber?: string;
  extractState?: string;
  extractLga?: string;
  extractPoliceDivision?: string;
  approval_level?: number;
  status?: string;
  rejection_reason?: string;
  serviceInvoice?: any;
  createPoliceExtract?: any;
}

export interface IPoliceExtractService {
  createExtract(user: User, payload: PoliceExtractDto): Promise<IPoliceExtract>;
  getApplicantsExtracts(user: User): Promise<IPoliceExtract[]>;
  getExtract(id: number): Promise<IPoliceExtract>;
  approveExtract(id: number, officer: IOfficers): Promise<{ message: 'extracted approved' }>;
  getOfficerExtracts(officer: IOfficers): Promise<IPoliceExtract[]>;
  rejectExtract(id: number, officer: IOfficers): Promise<{ message: 'extracted rejected' }>;
}
