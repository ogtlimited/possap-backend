import { IOfficers } from '@interfaces/officer.interface';
import { CreatePoliceCharacterCertificateDTO } from '@dtos/police-character-certificate.dto';
import { User } from '@interfaces/users.interface';
import {UserEntity} from "@entities/users.entity";

export interface IPoliceCharacterCertificate {
  id?: string;
  requestType?: string;
  reasonForInquiry?: string;
  stateOfOrigin?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  destinationCountry?: string;
  passportNumber?: string;
  placeOfIssuance?: string;
  dateOfIssuance?: string;
  hasBeenConvicted?: string;
  convictionHistory?: string;
  passportPhotograph?: string;
  passportBioDataPage?: string;
  certificateRequestCommand?: string;
  status?: string;
  approval_level?: number;
  user_type?: string;
  payment_status?: string;
  verification_id?: string;
  user?: UserEntity;
  createPoliceCertificate?: any;
  serviceInvoice?: any;
}

export interface IPoliceCharacterCertificateService {
  createUserPoliceCharacterCertificate(user: User, payload: CreatePoliceCharacterCertificateDTO): Promise<IPoliceCharacterCertificate>;
  getUserPoliceCharacterCertificateRecords(user: User): Promise<IPoliceCharacterCertificate[]>;
  getPoliceCharacterCertificateRecord(id: string, user, userType): Promise<IPoliceCharacterCertificate>;
  getOfficerPoliceCharacterCertificateRecords(officer: IOfficers): Promise<IPoliceCharacterCertificate[]>;
  approvePoliceCharacterCertificateRecords(id: string, payload, officer: IOfficers): Promise<{ message: 'certificate approved successfully' }>;
  rejectPoliceCharacterCertificateRecords(id: string, officer: IOfficers, reason): Promise<{ message: 'certificate rejected successfully' }>;
}

export interface IPoliceCharacterApprover{
  approver1?: IPoliceCharacterApproverProperties;
  approver2?: IPoliceCharacterApproverProperties;
  approver3?: IPoliceCharacterApproverProperties;
  approver4?: IPoliceCharacterApproverProperties;
  approver5?: IPoliceCharacterApproverProperties;
  secretariatRouting?: IPoliceCharacterApproverProperties;
}

export interface IPoliceCharacterApproverProperties{
    comment: string;
    date: string;
    approved: boolean;
    officerId: string;
}
