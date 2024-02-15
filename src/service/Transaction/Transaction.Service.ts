import { Transaction } from "../../models/Transaction/Transaction";
import { ITransactionRepository } from "../../repository/Transaction/ITransaction.Repository";
import { IUserRepository } from "../../repository/User/IUser.Repository";

export class TransactionService {
  constructor(
    private transactionRepository: ITransactionRepository,
    private userRepository: IUserRepository
  ) {}
  
  async saveTransaction({ amount, sender, receiver, timestamp }: Transaction) {
    const userSender = await this.userRepository.userById(Number(sender));
    const userReceiver = await this.userRepository.userById(Number(receiver));

    if (!userSender) {
      throw new Error("Remetente invalido");
    }
    if (userSender["userType"] === "lojista") {
      throw new Error("Lojista não pode fazer transferencia");
    }
    if (!userReceiver) {
      throw new Error("Destinatário invalido");
    }
    if (userSender["balance"] < amount) {
      throw new Error("Remetente não possui saldo suficiente");
    }

    const transaction = await this.transactionRepository.saveTransaction({
      amount,
      sender,
      receiver,
      timestamp,
    });

    return transaction;
  }
}
