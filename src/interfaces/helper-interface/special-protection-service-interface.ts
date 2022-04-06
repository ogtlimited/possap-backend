export interface ISpecialProtectionService {
  Id: number;
  ParentId: number;
  Name: string;
  ParentName?: any;
  MinimumRequiredOfficers: number;
  ShowExtraFields: boolean;
  Code: string;
  CommandCategoryId?: number;
  LGAId?: number;
  StateId?: number;
  LGAName?: any;
  StateName?: any;
  Address?: any;
  CommandTypeId?: number;
  SelectAllSections?: boolean;
  SelectAllSubSections?: boolean;
}
