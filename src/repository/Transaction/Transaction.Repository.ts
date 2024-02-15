import { pool } from "../../database/database";
import { Transaction } from "../../models/Transaction/Transaction";
import { ITransactionRepository } from "./ITransaction.Repository";

export class TransactionRepository implements ITransactionRepository {
  async saveTransaction({
    amount,
    sender,
    receiver,
    timestamp,
  }: Transaction): Promise<Transaction> {
    const newTool = await pool.query<Transaction>(
      "INSERT INTO transactions (amount, sender,receiver,timestamp) VALUES ($1, $2, $3, $4) RETURNING *",
      [amount, sender, receiver, timestamp]
    );

    return newTool.rows[0];
  }
  async receiveUpdatebalance(
    recipient_id: number,
    amount: number
  ): Promise<void> {
    await pool.query("UPDATE users SET balance = balance + $1 WHERE id = $2", [
      amount,
      recipient_id,
    ]);
  }
  async senderUpdatebalance(sender_id: number, amount: number): Promise<void> {
    await pool.query("UPDATE users SET balance = balance - $1 WHERE id = $2", [
      amount,
      sender_id,
    ]);
  }
}
