import { User } from "../../models/user/User";

export interface IUserRepository {
  userById(id: string): Promise<User | []>;
  userExist(id: string): Promise<boolean>;
  userByEmail(email: string): Promise<User>;
  users(): Promise<User[]>;
}
