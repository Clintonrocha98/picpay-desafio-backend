import { TransactionRepository } from "../../repository/Transaction/Transaction.Repository";
import { UserRepository } from "../../repository/User/User.Repository";
import { TransactionService } from "../../service/Transaction/Transaction.Service";
import { TransactionController } from "../../controller/Transaction/Transaction.Controller";

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
