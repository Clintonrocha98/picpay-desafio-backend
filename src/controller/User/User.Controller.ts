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
      userType,
    } = req.body;

    const nUser = await this.userService.newUser({
      fristName,
      lastName,
      document,
      balance,
      email,
      password,
      userType,
    });

    res.status(201).json(nUser);
  }
  async userById(req: Request, res: Response) {
    const { id } = req.params;
    const tool = await this.userService.userById(Number(id));
    res.status(200).json(tool);
  }
}
