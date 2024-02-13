export enum UserType {
  COMUM = "comum",
  LOJISTA = "lojista",
}
export class User {
  fristName: string;
  lastName: string;
  document: string;
  password: string;
  email: string;
  balance: number;
  userType: UserType;
}
