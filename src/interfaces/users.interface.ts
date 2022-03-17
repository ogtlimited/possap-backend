export interface User {
  id: number;
  email: string;
  password: string;
  userType: string;
  phone: string;
  fullName: string;
  state: string;
  lga: string;
  identificationType: string;
  identificationNumber: string;
  identificationDoc?: string;
  address: string;
}
