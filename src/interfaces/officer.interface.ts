export interface IOfficers {
  apNumber: string;
  id?: any;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  profile: any;
  commandAccess?: any[];
}

export interface IExtractApprovalLevel {
  extractFirstApproval: boolean;
  extractSecondApproval: boolean;
}
export interface ICharacterCertApprovalLevel {
  firstCCApproval: boolean;
  secondCCApproval: boolean;
  thirdCCApproval: boolean;
  fourthCCApproval: boolean;
  fifthCCApproval: boolean;
  secretariatRouting: boolean;
}
export interface IEGSApprovalLevel {
  escortRequest1: boolean;
  escortRequest2: boolean;
  escortRequest3: boolean;
  escortTactictalRequest: boolean;
  escortTactictalSecretariatRouting: boolean;
  escortConventionalRequest1: boolean;
  escortConventionalRequest2: boolean;
  escortConventionalSecretariatRouting: boolean;
}
