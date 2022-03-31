import {User} from "@interfaces/users.interface";
import {CreateUserDto} from "@dtos/users.dto";
import {PoliceExtractDto} from "@dtos/police_extract.dto";

export interface IPoliceExtract {
  id?: number;
  userId?: string;
  userType?: string;
  category?: string;
  sub_category?:string;
  incident_reported?: boolean;
  court_affidavit?:string;
  affidavit_number?:string;
  police_division_state?:string;
  police_division_lga?:string;
  police_division_area?:string;
}

export interface IPoliceExtractService {

  createExtract(user: User, payload: PoliceExtractDto): Promise<IPoliceExtract>;
  getApplicantsExtract(user: User): Promise<IPoliceExtract[]>;
  getExtracts(): Promise<IPoliceExtract[]>;
  updateExtract(): Promise<IPoliceExtract>;

}
