import { TransactionRepository } from "../../repository/Transaction/transaction.repository";
import { UserRepository } from "../../repository/User/user.repository";
import { TransactionService } from "../../service/Transaction/transaction.service";
import { TransactionController } from "../../controller/Transaction/transaction.controller";
import { ExternalAuthorizationService } from "../../service/ExternalAuthorization/externalAuthorization.service";
import { ExternalNotificationService } from "../../service/ExternalNotification/externalNotification.service";
import { UserService } from "../../service/User/user.service";

export const transactionFactory = () => {
  const transactionRepository = new TransactionRepository();
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const authorizationService = new ExternalAuthorizationService();
  const notificationService = new ExternalNotificationService();
  const transactionService = new TransactionService(
    transactionRepository,
    userService,
    authorizationService,
    notificationService
  );
  const transactionController = new TransactionController(transactionService);

  return transactionController;
};
