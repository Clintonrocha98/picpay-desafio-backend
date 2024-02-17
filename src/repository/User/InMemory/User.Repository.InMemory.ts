import { User } from "../../../models/user/User";
import { IUserRepository } from "../IUser.Repository";

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async newUser({
    fristName,
    lastName,
    document,
    balance,
    email,
    password,
    usertype,
  }: User): Promise<User> {
    const newUser = {
      id: this.users.length + 1,
      fristName,
      lastName,
      document,
      balance,
      email,
      password,
      usertype,
    };
    this.users.push(newUser);
    return newUser;
  }

  async userById(id: number): Promise<User> {
    const achou = this.users.find((user) => user.id === id);
    return achou ? achou : ([] as unknown as User);
  }

  async emailExist(email: string): Promise<boolean> {
    const achou = this.users.some((user) => user.email === email);
    return !achou;
  }

  async documentExist(document: string): Promise<boolean> {
    const achou = this.users.some((user) => user.document === document);
    return !achou;
  }
}