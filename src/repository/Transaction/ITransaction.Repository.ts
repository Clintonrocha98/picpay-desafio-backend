import { Transaction } from "../../models/Transaction/Transaction";

export interface ITransactionRepository {
  saveTransaction(data: Transaction): Promise<Transaction>;
  receiveUpdatebalance(recipient_id: number, amount: number): Promise<void>;
  senderUpdatebalance(sender_id: number, amount: number): Promise<void>;
}
