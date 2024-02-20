import { pool } from "../../database/database";
import { User } from "../../models/user/User";
import { IUserRepository } from "./IUser.repository";

export class UserRepository implements IUserRepository {
  async newUser({
    firstName,
    lastName,
    document,
    balance,
    email,
    password,
    usertype,
  }: User): Promise<User> {
    const newTool = await pool.query<User>(
      "INSERT INTO users (firstName, lastName, document, balance, email, password, usertype) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [firstName, lastName, document, balance, email, password, usertype]
    );

    return newTool.rows[0];
  }

  async userById(id: number): Promise<User> {
    const user = await pool.query<User>("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return user.rows[0];
  }

  async emailExist(email: string): Promise<boolean> {
    const exist = await pool.query<User>("SELECT FROM users WHERE email = $1", [
      email,
    ]);
    return exist.rows.length === 0;
  }

  async documentExist(document: string): Promise<boolean> {
    const exist = await pool.query<User>(
      "SELECT FROM users WHERE document = $1",
      [document]
    );
    return exist.rows.length === 0;
  }
}
