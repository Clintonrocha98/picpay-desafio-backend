import { test, expect, describe, vi } from "vitest";
import { InMemoryTransactionRepository } from "../../repository/Transaction/InMemory/transaction.repository.InMemory";
import { InMemoryUserRepository } from "../../repository/User/InMemory/user.repository.InMemory";
import { TransactionService } from "./transaction.service";
import User from "../../models/user/User";
import Transaction from "../../models/Transaction/transaction";
import { ExternalAuthorizationService } from "../ExternalAuthorization/externalAuthorization.service";
import { ExternalNotificationService } from "../ExternalNotification/externalNotification.service";
import { UserService } from "../User/user.service";

const makeSut = (authorization = true) => {
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

  const fakeAuthorization: ExternalAuthorizationService = {
    authorizeTransaction: vi.fn().mockResolvedValue(authorization),
  };

  const notificationService = new ExternalNotificationService();

  const userService = new UserService(inMemoryUser);

  const service = new TransactionService(
    inMemoryTransaction,
    userService,
    fakeAuthorization,
    notificationService
  );
  const fakeTransaction: Transaction = {
    amount: 100,
    payer: 1,
    payee: 2,
  };

  return { fakeTransaction, service, inMemoryUser };
};

describe("transaction service", () => {
  test("it must be possible to carry out a transaction", async () => {
    const { service, fakeTransaction } = makeSut();
    const transaction = await service.saveTransaction(fakeTransaction);

    expect(transaction).toHaveProperty("id");
    expect(transaction).toHaveProperty("date_transaction");
  });
  test("it must not be possible to carry out a transaction, invalid payer", async () => {
    const { service, fakeTransaction } = makeSut();

    await expect(
      service.saveTransaction({
        ...fakeTransaction,
        payer: 999,
      })
    ).rejects.toThrow("Usuario invalido");
  });
  test("it must not be possible to carry out a transaction, Shopkeeper cannot make a transfer", async () => {
    const { service, fakeTransaction } = makeSut();

    await expect(
      service.saveTransaction({
        ...fakeTransaction,
        payer: 2,
        payee: 1,
      })
    ).rejects.toThrow("Lojista não pode fazer transferencia");
  });
  test("it must not be possible to carry out a transaction, Invalid sender", async () => {
    const { service, fakeTransaction } = makeSut();

    await expect(
      service.saveTransaction({
        ...fakeTransaction,
        payee: 999,
      })
    ).rejects.toThrow("Usuario invalido");
  });
  test("it must not be possible to carry out a transaction, there is no balance", async () => {
    const { service, fakeTransaction } = makeSut();

    await expect(
      service.saveTransaction({
        ...fakeTransaction,
        amount: 9999,
      })
    ).rejects.toThrow("Remetente não possui saldo suficiente");
  });
  test("it must not be possible to carry out a transaction, Unauthorized transaction", async () => {
    const { service, fakeTransaction } = makeSut(false);

    await expect(service.saveTransaction(fakeTransaction)).rejects.toThrow(
      "Transação não autorizada"
    );
  });
});
