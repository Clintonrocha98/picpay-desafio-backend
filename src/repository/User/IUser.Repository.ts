import { User } from "../../models/user/User";

export interface IUserRepository {
  newUser(user: User): Promise<User>;
  userById(id: number): Promise<User>;
  emailExist(email: string): Promise<boolean>;
  documentExist(document: string): Promise<boolean>;
}
