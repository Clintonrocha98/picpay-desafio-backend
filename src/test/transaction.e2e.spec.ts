import { test, expect, describe, afterEach } from "vitest";
import { app } from "../config/express";
import { pool } from "../database/database";
import request from "supertest";
import User from "../models/user/User";
import Transaction from "../models/Transaction/transaction";
import { UserRepository } from "../repository/User/user.repository";

const fakeUser: User = {
  firstName: "fulano",
  lastName: "de tal",
  document: "12345678901",
  balance: 1000,
  email: "fulano@email.com",
  password: "123456789",
  usertype: "comum",
};
let fakeTransaction: Transaction;

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

afterEach(async () => {
  await clearTables();
});
describe("E2E", () => {
  test("deve ser possivel criar um usuario", async () => {
    const res = await request(app).post("/user").send(fakeUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
  test("deve ser possivel fazer uma transação", async () => {
    const userRepository = new UserRepository();

    const [comum, lojista] = await Promise.all([
      userRepository.newUser(fakeUser),
      userRepository.newUser({
        ...fakeUser,
        document: "123",
        email: "email@email.com",
        usertype: "lojista",
      }),
    ]);

    fakeTransaction = {
      payer: comum.id as number,
      payee: lojista.id as number,
      amount: 100,
    };

    const res = await request(app)
      .post("/transaction")
      .send(fakeTransaction)
      .expect(201);
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("date_transaction");
  });
});
