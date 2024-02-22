import { test, expect, describe } from "vitest";
import { UserService } from "./user.service";
import { InMemoryUserRepository } from "../../repository/User/InMemory/user.repository.InMemory";
import User from "../../models/user/User";

const makeSut = () => {
  const inMemoryUserRepository = new InMemoryUserRepository();
  const userService = new UserService(inMemoryUserRepository);
  const fakeUser: User = {
    firstName: "fulano",
    lastName: "de tal",
    document: "12345678901",
    balance: 1000,
    email: "fulano@email.com",
    password: "123456789",
    usertype: "comum",
  };

  return { userService, fakeUser };
};

describe("User service", () => {
  test("it must be possible to create a user", async () => {
    const { fakeUser, userService } = makeSut();
    const user = await userService.newUser(fakeUser);

    expect(user).toHaveProperty("id");
  });
  test("It should not be possible to create a user with an email that already exists", async () => {
    const { fakeUser, userService } = makeSut();
    await userService.newUser(fakeUser);

    await expect(userService.newUser(fakeUser)).rejects.toThrow(
      "Email invalido"
    );
  });
  test("It should not be possible to create a user with a document that already exists", async () => {
    const { fakeUser, userService } = makeSut();
    await userService.newUser({
      ...fakeUser,
      email: "emaildiferente@email.com",
    });

    await expect(userService.newUser(fakeUser)).rejects.toThrow(
      "Document invalid"
    );
  });
  test("it must be possible to find a user by id", async () => {
    const { fakeUser, userService } = makeSut();

    const user = await userService.newUser(fakeUser);

    expect(await userService.userById(Number(user.id))).toEqual(user);
  });
  test("It should not be possible to find a user by ID", async () => {
    const { userService } = makeSut();

    await expect(userService.userById(999)).rejects.toThrow("Usuario invalido");
  });
  test("It must not be possible to validate the transfer, the retailer cannot make the transfer", async () => {
    const { fakeUser, userService } = makeSut();

    await expect(
      userService.validateTransaction({ ...fakeUser, usertype: "lojista" }, 10)
    ).rejects.toThrow("Lojista não pode fazer transferencia");
  });
  test("It must not be possible to validate the transfer, the sender does not have sufficient funds", async () => {
    const { fakeUser, userService } = makeSut();

    await expect(
      userService.validateTransaction({ ...fakeUser }, 9999)
    ).rejects.toThrow("Remetente não possui saldo suficiente");
  });
});
