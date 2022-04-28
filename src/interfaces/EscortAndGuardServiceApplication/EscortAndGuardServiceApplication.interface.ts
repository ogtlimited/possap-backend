export interface EscortAndGuardServiceApplication {
  serviceCategory: string;
  categoryType: string;
  userId: number;
  unit: string;
  tacticalSquad: string;
  commandFormation: string;
  originState: string;
  originLga: string;
  serviceDeliveryState: string;
  serviceDeliveryLga: string;
  escortAddress: string;
  escortStartDate: Date;
  escortEndDate: Date;
  escortOfficersRequired: boolean;
  //invoicePaymentMethod: string;
}