import { test, expect, describe, afterEach, beforeEach } from "vitest";
import { app } from "../config/express";
import { pool } from "../database/database";
import request from "supertest";
import User from "../models/user/User";
import Transaction from "../models/Transaction/transaction";
import { UserRepository } from "../repository/User/user.repository";

const BASE_URL = "http://localhost:3000";

const clearTables = async () => {
  try {
    await pool.query(`
      BEGIN;
      DELETE FROM transactions;
      DELETE FROM users;
      COMMIT;
  `);
    console.log("Tabelas esvaziadas com sucesso antes dos testes");
  } catch (error) {
    console.error("Erro ao esvaziar tabelas antes dos testes:", error);
  }
};

const makeSut = async () => {
  const fakeUser: User = {
    firstName: "fulano",
    lastName: "de tal",
    document: "12345678901",
    balance: 1000,
    email: "fulano@email.com",
    password: "123456789",
    usertype: "comum",
  };
  const userRepository = new UserRepository();

  const fakeTransaction: Transaction = {
    payer: 1,
    payee: 2,
    amount: 100,
  };
  return { userRepository, fakeTransaction, fakeUser };
};

beforeEach(async () => {
  await clearTables();
});

describe("E2E", () => {
  test("deve ser possivel criar um usuario", async () => {
    const { fakeUser } = await makeSut();
    const res = await request(app).post("/user").send(fakeUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
  test("não deve ser possivel criar um usuario, email invalido", async () => {
    const { fakeUser, userRepository } = await makeSut();

    await userRepository.newUser(fakeUser);

    const request = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeUser),
    });

    expect(request.status).toBe(401);

    const response = await request.json();

    expect(response).toEqual({ error: "Email invalido", code: 401 });
  });
  test("não deve ser possivel criar um usuario, documento invalido", async () => {
    const { fakeUser, userRepository } = await makeSut();

    await userRepository.newUser(fakeUser);

    const request = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...fakeUser, email: "emaildiferente@email.com" }),
    });

    expect(request.status).toBe(401);

    const response = await request.json();

    expect(response).toEqual({ error: "Document invalid", code: 401 });
  });
  test("deve ser possivel fazer uma transação e a conta do usuario deve ser alterado", async () => {
    const { fakeTransaction, userRepository, fakeUser } = await makeSut();

    const [comum, lojista] = await Promise.all([
      userRepository.newUser(fakeUser),
      userRepository.newUser({
        ...fakeUser,
        usertype: "lojista",
        document: "123",
        email: "fakeemail@email.com",
      }),
    ]);
    const res = await request(app)
      .post("/transaction")
      .send({ ...fakeTransaction, payer: comum.id, payee: lojista.id })
      .expect(201);

    const [comumByID, lojistaByID] = await Promise.all([
      userRepository.userById(comum.id as number),
      userRepository.userById(lojista.id as number),
    ]);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("date_transaction");
    expect(comumByID.balance).toEqual(900);
    expect(lojistaByID.balance).toEqual(1100);
  });

});
