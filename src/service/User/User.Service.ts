import User from "../../models/user/User";
import { IUserRepository } from "../../repository/User/IUser.repository";
import {
  InvalidDocument,
  InvalidEmail,
  InvalidUser,
  PayerDoesNotHaveSufficientBalance,
  RetailerCannotMakeTransfer,
} from "./Error/user.error";

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

  async userById(id: number) {
    const user = await this.userRepository.userById(id);

    if (!user) {
      throw new InvalidUser("Usuario invalido");
    }
    return user;
  }

  async validateTransaction(user: User, amount: number) {
    if (user.usertype === "lojista") {
      throw new RetailerCannotMakeTransfer(
        "Lojista não pode fazer transferencia"
      );
    }

    if (user.balance < amount) {
      throw new PayerDoesNotHaveSufficientBalance(
        "Remetente não possui saldo suficiente"
      );
    }
  }
}
