export type User = {
  id?: number;
  fristName: string;
  lastName: string;
  document: string;
  password: string;
  email: string;
  balance: number;
  usertype: "comum" | "lojista";
};
