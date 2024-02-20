import { TransactionRepository } from "../../repository/Transaction/transaction.repository";
import { UserRepository } from "../../repository/User/user.repository";
import { TransactionService } from "../../service/Transaction/transaction.service";
import { TransactionController } from "../../controller/Transaction/transaction.controller";

export const transactionFactory = () => {
  const transactionRepository = new TransactionRepository();
  const userRepository = new UserRepository();
  const transactionService = new TransactionService(
    transactionRepository,
    userRepository
  );
  const transactionController = new TransactionController(transactionService);

  return transactionController;
};
