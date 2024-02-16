import { Request, Response } from "express";
import { UserService } from "../../service/User/User.Service";

export class UserController {
  constructor(private userService: UserService) {}

  async newUser(req: Request, res: Response) {
    const {
      fristName,
      lastName,
      document,
      balance,
      email,
      password,
      usertype,
    } = req.body;
    const NewUser = await this.userService.newUser({
      fristName,
      lastName,
      document,
      balance,
      email,
      password,
      usertype,
    });

    res.status(201).json(NewUser);
  }
}
