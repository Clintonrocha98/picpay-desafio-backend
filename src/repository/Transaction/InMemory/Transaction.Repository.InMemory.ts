import { Transaction } from "../../../models/Transaction/Transaction";
import { ITransactionRepository } from "../ITransaction.Repository";

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async saveTransaction({
    amount,
    payer,
    payee,
  }: Transaction): Promise<Transaction> {
    this.transactions.push({
      id: this.transactions.length + 1,
      amount,
      payer,
      payee,
      date_transaction: new Date(),
    });
    return this.transactions[0];
  }
  async payeeUpdatebalance(payee_id: number, amount: number): Promise<void> {
    return;
  }
  async payerUpdatebalance(payer_id: number, amount: number): Promise<void> {
    return;
  }
}
