import { test, expect, describe } from "vitest";
import { InMemoryTransactionRepository } from "../../repository/Transaction/InMemory/Transaction.Repository.InMemory";
import { InMemoryUserRepository } from "../../repository/User/InMemory/User.Repository.InMemory";
import { TransactionService } from "./transaction.service";
import { User } from "../../models/user/User";
import { Transaction } from "../../models/Transaction/transaction";

const makeSut = () => {
  const fakeUser: User = {
    firstName: "fulano",
    lastName: "de tal",
    document: "12345678901",
    balance: 1000,
    email: "fulano@email.com",
    password: "123456789",
    usertype: "comum",
  };
  const inMemoryUser = new InMemoryUserRepository();
  inMemoryUser.newUser(fakeUser);
  inMemoryUser.newUser({
    ...fakeUser,
    document: "123",
    email: "test@email.com",
    usertype: "lojista",
  });
  const inMemoryTransaction = new InMemoryTransactionRepository();
  const service = new TransactionService(inMemoryTransaction, inMemoryUser);
  const fakeTransaction: Transaction = {
    amount: 100,
    payer: 1,
    payee: 2,
  };

  return { fakeTransaction, service, inMemoryUser };
};

describe("transaction service", () => {
  test("deve ser possivel efetura uma transação", async () => {
    const { service, fakeTransaction } = makeSut();
    const transaction = await service.saveTransaction(fakeTransaction);

    expect(transaction).toHaveProperty("id");
    expect(transaction).toHaveProperty("date_transaction");
  });
  test("não deve ser possivel efetuar uma transação, pagador invalido", async () => {
    const { service, fakeTransaction } = makeSut();

    await expect(
      service.saveTransaction({
        ...fakeTransaction,
        payer: 999,
      })
    ).rejects.toThrow("Pagador invalido");
  });
  test("não deve ser possivel efetuar uma transação, Lojista não pode fazer transferencia", async () => {
    const { service, fakeTransaction } = makeSut();

    await expect(
      service.saveTransaction({
        ...fakeTransaction,
        payer: 2,
        payee: 1,
      })
    ).rejects.toThrow("Lojista não pode fazer transferencia");
  });
  test("não deve ser possivel efetuar uma transação, Remetente invalido", async () => {
    const { service, fakeTransaction } = makeSut();

    await expect(
      service.saveTransaction({
        ...fakeTransaction,
        payee: 999,
      })
    ).rejects.toThrow("Destinatário invalido");
  });
  test("não deve ser possivel efetuar uma transação, Nâo possui saldo", async () => {
    const { service, fakeTransaction } = makeSut();

    await expect(
      service.saveTransaction({
        ...fakeTransaction,
        amount: 9999,
      })
    ).rejects.toThrow("Remetente não possui saldo suficiente");
  });
});
