import { IOfficers } from '@interfaces/officer.interface';
import { CreatePoliceCharacterCertificateDTO } from '@dtos/police-character-certificate.dto';
import { User } from '@interfaces/users.interface';

export interface IPoliceCharacterCertificate {
  id: string;
  requestType: string;
  reasonForInquiry: string;
  stateOfOrigin: string;
  placeOfBirth: string;
  dateOfBirth: Date;
  destinationCountry: string;
  passportNumber: string;
  placeOfIssuance: string;
  dateOfIssuance: Date;
  hasBeenConvicted: string;
  convictionHistory: string;
  passportPhotograph: string;
  passportBioDataPage: string;
  certificateRequestCommand: string;
  status: string;
  approval_level?: number;
  user_type: string;
  payment_status: string;
  verification_id: string;
  userId: number;
}

export interface IPoliceCharacterCertificateService {
  createUserPoliceCharacterCertificate(user: User, payload: CreatePoliceCharacterCertificateDTO): Promise<IPoliceCharacterCertificate>;
  getUserPoliceCharacterCertificateRecords(user: User): Promise<IPoliceCharacterCertificate[]>;
  getPoliceCharacterCertificateRecord(id: string): Promise<IPoliceCharacterCertificate>;
  getOfficerPoliceCharacterCertificateRecords(officer: IOfficers): Promise<IPoliceCharacterCertificate[]>;
  approvePoliceCharacterCertificateRecords(id: string, officer: IOfficers): Promise<{ message: 'certificate approved successfully' }>;
  rejectPoliceCharacterCertificateRecords(id: string, officer: IOfficers, reason: string): Promise<{ message: 'certificate rejected successfully' }>;
}
