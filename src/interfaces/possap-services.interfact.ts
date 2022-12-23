export interface IPossapService {
  id?: string;
  name?: string;
  slug?: string;
  approvalWorkFlow?: any[];
  workFlow?: any;
  services?: any[];
}
export interface IPossapServiceFields {
  id?: string;
  service?: any;
  formFields?: any[];
  ref?: string;
  status?: string;
  owner?: any;
  approvalLevel?: string;
  processor?: string;
  approvingOfficers?: IApprovers[];
  approvalLog?: IApprovalLog[];
}

export interface IApprovers {
  officerId: string;
  approvalLevel: string;
}
export interface IApprovalLog {
  officerId: string;
  status: string;
  timeOfApproval: string;
  comment: string;
}
