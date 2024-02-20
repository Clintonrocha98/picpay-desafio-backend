import { Request, Response } from "express";
import { UserService } from "../../service/User/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async newUser(req: Request, res: Response) {
    const {
      firstName,
      lastName,
      document,
      balance,
      email,
      password,
      usertype,
    } = req.body;
    const NewUser = await this.userService.newUser({
      firstName,
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
