import {IOfficers} from "@interfaces/officer.interface";
import {CreatePoliceCharacterCertificateDTO} from "@dtos/police-character-certificate.dto";
import {User} from "@interfaces/users.interface";

export interface IPoliceCharacterCertificate {
  id: string;
  request_type: string;
  reason_for_inquiry: string;
  state_of_origin: string;
  place_of_birth: string;
  date_of_birth: Date
  destination_country: string;
  passport_number: string;
  place_of_issuance: string;
  date_of_issuance: Date;
  previously_convicted: string;
  passport_photograph: string;
  international_passport_data_page: string;
  status: string;
  approval_level?: number;
  user_type: string;
  payment_status: string;
  verification_id: string;
  userId: number;
}

export interface IPoliceCharacterCertificateService{
  createUserPoliceCharacterCertificate(user: User, payload: CreatePoliceCharacterCertificateDTO): Promise<IPoliceCharacterCertificate>
  getUserPoliceCharacterCertificateRecords(user: User): Promise<IPoliceCharacterCertificate[]>
  getPoliceCharacterCertificateRecord(id: string): Promise<IPoliceCharacterCertificate>
  getOfficerPoliceCharacterCertificateRecords(officer: IOfficers): Promise<IPoliceCharacterCertificate[]>
  approvePoliceCharacterCertificateRecords(id: string, officer: IOfficers): Promise<{ message: "certificate approved successfully" }>
  rejectPoliceCharacterCertificateRecords(id: string, officer: IOfficers, reason: string): Promise<{ message: "certificate rejected successfully" }>
}
