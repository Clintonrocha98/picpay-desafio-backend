import { Transaction } from "../../models/Transaction/Transaction";

export interface ITransactionRepository {
  saveTransaction(data: Transaction): Promise<Transaction>;
  payerUpdatebalance(payer_id: number, amount: number): Promise<void>;
  payeeUpdatebalance(payee_id: number, amount: number): Promise<void>;
}
