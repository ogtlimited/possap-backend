import {User} from "@interfaces/users.interface";
import {CreateUserDto} from "@dtos/users.dto";
import {PoliceExtractDto} from "@dtos/police_extract.dto";
import {IOfficers} from "@interfaces/officer.interface";

export interface IPoliceExtract {
  id?: number;
  userId?: any;
  userType?: string;
  category?: string;
  sub_category?:string;
  incident_reported?: boolean;
  court_affidavit?:string;
  affidavit_number?:string;
  police_division_state?:string;
  police_division_lga?:string;
  police_division_area?:string;
  approval_level?: number;
  status?: string;
  rejection_reason?:string;
}

export interface IPoliceExtractService {

  createExtract(user: User, payload: PoliceExtractDto): Promise<IPoliceExtract>;
  getApplicantsExtracts(user: User): Promise<IPoliceExtract[]>;
  getExtract(id:number): Promise<IPoliceExtract>;
  approveExtract(id: number, officer:IOfficers): Promise<{message: "extracted approved"}>;
  getOfficerExtracts(officer: IOfficers): Promise<IPoliceExtract[]>;
  rejectExtract(id: number, officer:IOfficers): Promise<{message: "extracted rejected"}>;

}
