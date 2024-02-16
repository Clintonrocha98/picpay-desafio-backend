import { Request, Response } from "express";
import { TransactionService } from "../../service/Transaction/Transaction.Service";

export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  async saveTransaction(req: Request, res: Response) {
    const { amount, payee, payer } = req.body;

    const transaction = await this.transactionService.saveTransaction({
      amount,
      payee,
      payer,
    });

    res.status(201).json(transaction);
  }
}
