import { User } from "../../models/user/User";
import { IUserRepository } from "../../repository/User/IUser.Repository";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async newUser(user: User) {
    const newUser = await this.userRepository.newUser(user);
    return newUser;
  }

  async userById(id: number) {
    const user = await this.userRepository.userById(id);
    return user;
  }
  async users() {
    const user = await this.userRepository.users();
    return user;
  }
}
