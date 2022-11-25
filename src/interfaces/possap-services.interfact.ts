export interface IPossapService {
  id?: number;
  name?: string;
  slug?: string;
  approvalWorkFlow?: any[];
  services?: any[];
}
export interface IPossapServiceFields {
  id?: number;
  service?: any;
  formFields?: any[];
  ref?: string;
  status?: string;
  owner?: any;
  approvalLevel?: string;
  approvingOfficers?: IApprovers[];
}
export interface IApprovers {
  officerId: string;
  approvalLevel: string;
}
