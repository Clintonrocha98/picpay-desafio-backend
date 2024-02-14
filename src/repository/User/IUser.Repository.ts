import { User } from "../../models/user/User";

export interface IUserRepository {
  newUser(user: User): Promise<User>;
  userById(id: number): Promise<User | []>;
  userExist(id: number): Promise<boolean>;
  userByEmail(email: string): Promise<User>;
  users(): Promise<User[]>;
}
