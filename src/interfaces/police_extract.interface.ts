import { User } from '@interfaces/users.interface';
import { PoliceExtractDto } from '@dtos/police_extract.dto';
import { IOfficers } from '@interfaces/officer.interface';

export interface IPoliceExtract {
  id?: string;
  user?: any;
  user_type?: string;
  extract_category?: string;
  extract_sub_category?: string
  date_reported?: string;
  incident_reported?: boolean;
  court_affidavit?: string;
  affidavit_number?: string;
  extract_police_division_lga?: string;
  extract_police_division_state?: string;
  extract_police_division?: string;
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
