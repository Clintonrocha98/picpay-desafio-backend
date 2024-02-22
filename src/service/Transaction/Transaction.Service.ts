import Transaction from "../../models/Transaction/transaction";
import { ITransactionRepository } from "../../repository/Transaction/ITransaction.Repository";
import { UnauthorizedTransaction } from "./Error/transaction.error";
import { IAuthorizationService } from "../ExternalAuthorization/IAuthorization.service";
import { INotificationService } from "../ExternalNotification/IExternalNotification.service";
import { UserService } from "../User/user.service";

export class TransactionService {
  constructor(
    private transactionRepository: ITransactionRepository,
    private userSerivce: UserService,
    private authorizationService: IAuthorizationService,
    private notificationService: INotificationService
  ) {}

  async saveTransaction({ amount, payer, payee }: Transaction) {
    const userPayer = await this.userSerivce.userById(payer);
    const userPayee = await this.userSerivce.userById(payee);

    await this.userSerivce.validateTransaction(userPayer, amount);

    const isAuthorized = await this.authorizationService.authorizeTransaction();

    if (!isAuthorized) {
      throw new UnauthorizedTransaction("Transação não autorizada");
    }

    await this.transactionRepository.payeeUpdatebalance(Number(payee), amount);

    await this.transactionRepository.payerUpdatebalance(Number(payer), amount);

    const transaction = await this.transactionRepository.saveTransaction({
      amount,
      payer,
      payee,
      date_transaction: new Date(),
    });

    const payerProps = {
      firstname: userPayer.firstName,
      lastname: userPayer.lastName,
      email: userPayer.email,
    };
    const payeeProps = {
      firstname: userPayee.firstName,
      lastname: userPayee.lastName,
      email: userPayee.email,
    };

    await this.notificationService.notification(payerProps, payeeProps, amount);

    return transaction;
  }
}
