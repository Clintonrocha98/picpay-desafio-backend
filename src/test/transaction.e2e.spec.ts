import { test, expect, describe, beforeEach } from "vitest";
import { app } from "../config/express";
import { pool } from "../database/database";
import request from "supertest";
import User from "../models/user/User";
import { UserRepository } from "../repository/User/user.repository";

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
const userRepository = new UserRepository();

const fakeUser: User = {
  firstName: "fulano",
  lastName: "de tal",
  document: "12345678901",
  balance: 1000,
  email: "fulano@email.com",
  password: "123456789",
  usertype: "comum",
};

beforeEach(async () => {
  await clearTables();
});

describe("E2E", () => {
  test("it must be possible to create a user", async () => {
    const res = await request(app).post("/user").send(fakeUser);

    expect(res.status).toBe(201);
    
    expect(res.body).toHaveProperty("id");
  });

  test("It should not be possible to create a user, invalid email", async () => {
    await userRepository.newUser(fakeUser);

    const res = await request(app).post("/user").send(fakeUser);

    expect(res.status).toBe(401);

    expect(res.body).toEqual({ error: "Email invalido", code: 401 });
  });

  test("It should not be possible to create a user, invalid document", async () => {
    await userRepository.newUser(fakeUser);

    const response = await request(app)
      .post("/user")
      .send({ ...fakeUser, email: "emaildiferente@email.com" });

    expect(response.status).toBe(401);

    expect(response).toEqual({ error: "Document invalid", code: 401 });
  });

  test("it must be possible to make a transaction and the users' balance must be changed", async () => {
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
      .send({ amount: 100, payer: comum.id, payee: lojista.id })
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
