import { pool } from "../../database/database";
import { User } from "../../models/user/User";
import { IUserRepository } from "./IUser.Repository";

export class UserRepository implements IUserRepository {
  async newUser({
    fristName,
    lastName,
    document,
    balance,
    email,
    password,
    userType,
  }: User): Promise<User> {
    const newTool = await pool.query<User>(
      "INSERT INTO users (fristName, lastName, document, balance, email, password, userType) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [fristName, lastName, document, balance, email, password, userType]
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
