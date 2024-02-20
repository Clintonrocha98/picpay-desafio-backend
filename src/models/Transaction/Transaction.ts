type Transaction = {
  id?: number;
  amount: number;
  payer: number;
  payee: number;
  date_transaction?: Date;
}
export default Transaction;