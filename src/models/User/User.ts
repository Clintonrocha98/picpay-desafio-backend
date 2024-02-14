export enum UserType {
  COMUM = "comum",
  LOJISTA = "lojista",
}
export class User {
  id?: number;
  fristName: string;
  lastName: string;
  document: string;
  password: string;
  email: string;
  balance: number;
  userType: UserType;
}
