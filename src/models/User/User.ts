type User = {
  id?: number;
  firstName: string;
  lastName: string;
  document: string;
  password: string;
  email: string;
  balance: number;
  usertype: "comum" | "lojista";
};
export default User;