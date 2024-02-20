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
  test("deve ser possivel criar um usuario", async () => {
    const { fakeUser, userService } = makeSut();
    const user = await userService.newUser(fakeUser);

    expect(user).toHaveProperty("id");
  });
  test("Não deve ser possivel criar um usuario com email que já existe", async () => {
    const { fakeUser, userService } = makeSut();
    await userService.newUser(fakeUser);

    await expect(userService.newUser(fakeUser)).rejects.toThrow(
      "Email invalido"
    );
  });
  test("Não deve ser possivel criar um usuario com documento que já existe", async () => {
    const { fakeUser, userService } = makeSut();
    await userService.newUser({
      ...fakeUser,
      email: "emaildiferente@email.com",
    });

    await expect(userService.newUser(fakeUser)).rejects.toThrow(
      "Document invalid"
    );
  });
});
