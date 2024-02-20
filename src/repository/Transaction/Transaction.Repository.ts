import { pool } from "../../database/database";
import { Transaction } from "../../models/Transaction/transaction";
import { ITransactionRepository } from "./ITransaction.Repository";

export class TransactionRepository implements ITransactionRepository {
  async saveTransaction({
    amount,
    payer,
    payee,
    date_transaction,
  }: Transaction): Promise<Transaction> {
    const newTool = await pool.query<Transaction>(
      "INSERT INTO transactions (amount, payer, payee, date_transaction) VALUES ($1, $2, $3, $4) RETURNING *",
      [amount, payer, payee, date_transaction]
    );
    return newTool.rows[0];
  }
  async payeeUpdatebalance(payee_id: number, amount: number): Promise<void> {
    await pool.query("UPDATE users SET balance = balance + $1 WHERE id = $2", [
      amount,
      payee_id,
    ]);
  }
  async payerUpdatebalance(payer_id: number, amount: number): Promise<void> {
    await pool.query("UPDATE users SET balance = balance - $1 WHERE id = $2", [
      amount,
      payer_id,
    ]);
  }
}
