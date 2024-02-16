import { Transaction } from "../../models/Transaction/Transaction";
import { ITransactionRepository } from "../../repository/Transaction/ITransaction.Repository";
import { IUserRepository } from "../../repository/User/IUser.Repository";
import {
  PayeeInvalid,
  PayerDoesNotHaveSufficientBalance,
  PayerInvalid,
  RetailerCannotMakeTransfer,
  UnauthorizedTransaction,
} from "./Error/Transaction.Error";
import { ExternalAuthorizationService } from "./ExternalAuthorization/ExternalAuthorization.Service";
import { AuthorizationService } from "./ExternalAuthorization/IAuthorization.Service";

export class TransactionService {
  private authorizationService: AuthorizationService;

  constructor(
    private transactionRepository: ITransactionRepository,
    private userRepository: IUserRepository,
    authorizationService: AuthorizationService = new ExternalAuthorizationService()
  ) {
    this.authorizationService = authorizationService;
  }

  async saveTransaction({ amount, payer, payee }: Transaction) {
    const userPayer = await this.userRepository.userById(Number(payer));
    const userPayee = await this.userRepository.userById(Number(payee));

    if (!userPayer) {
      throw new PayerInvalid("Pagador invalido");
    }
    
    if (userPayer.usertype === "lojista") {
      throw new RetailerCannotMakeTransfer(
        "Lojista não pode fazer transferencia"
      );
    }
    if (!userPayee) {
      throw new PayeeInvalid("Destinatário invalido");
    }
    if (userPayer.balance < amount) {
      throw new PayerDoesNotHaveSufficientBalance(
        "Remetente não possui saldo suficiente"
      );
    }

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

    return transaction;
  }
}
