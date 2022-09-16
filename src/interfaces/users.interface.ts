export interface User {
  id: number;
  email: string;
  password: string;
  userType: string;
  phone: string;
  fullName: string;
  state: string;
  lga: string;
  nin: string;
  // identificationType: string;
  // identificationNumber: string;
  // identificationDoc?: string;
  otp?: string;
  active?: boolean;
  address: string;
}
