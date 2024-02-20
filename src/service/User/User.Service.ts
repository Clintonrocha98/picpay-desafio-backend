import User from "../../models/user/User";
import { IUserRepository } from "../../repository/User/IUser.repository";
import { InvalidDocument, InvalidEmail } from "./Error/User.Error";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async newUser(user: User) {
    const EmailExist = await this.userRepository.emailExist(user.email);

    if (!EmailExist) {
      throw new InvalidEmail("Email invalido");
    }

    const DocumentExist = await this.userRepository.documentExist(
      user.document
    );

    if (!DocumentExist) {
      throw new InvalidDocument("Document invalid");
    }
    const newUser = await this.userRepository.newUser(user);
    return newUser;
  }
}
