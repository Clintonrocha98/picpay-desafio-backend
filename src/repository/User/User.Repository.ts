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
    const user = await pool.query<User>("SELECT * FROM users WHERE $1", [id]);
    return user.rows[0];
  }
  async userByEmail(email: string): Promise<User> {
    const user = await pool.query<User>("SELECT * FROM users WHERE $1", [
      email,
    ]);
    return user.rows[0];
  }
  async userExist(id: number): Promise<boolean> {
    const exist = await pool.query<User>("SELECT FROM users WHERE id = $1", [
      id,
    ]);
    return exist.rows.length === 0;
  }
  async users(): Promise<User[]> {
    const user = await pool.query<User[] | []>(
      "SELECT * FROM users ORDER BY id ASC"
    );
    return user.rows[0];
  }
}
