import { Request, Response, Router } from "express";
import { userFactory } from "../factory/User/user.factory";
import { transactionFactory } from "../factory/Transaction/transaction.factory";

const routes = Router();

routes.post("/user", (req: Request, res: Response) =>
  userFactory().newUser(req, res)
);

routes.post("/transaction", (req: Request, res: Response) =>
  transactionFactory().saveTransaction(req, res)
);

export { routes };
