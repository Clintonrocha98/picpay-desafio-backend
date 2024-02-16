export type Transaction = {
  id?: number;
  amount: number;
  payer: string;
  payee: string;
  date_transaction?: Date;
}
