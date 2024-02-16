import { Request, Response, Router } from "express";
import { userFactory } from "../factory/User/User.factory";
import { transactionFactory } from "../factory/Transaction/Transaction.Factory";

const routes = Router();

routes.post("/user", (req: Request, res: Response) =>
  userFactory().newUser(req, res)
);

routes.post("/transaction", (req: Request, res: Response) =>
  transactionFactory().saveTransaction(req, res)
);

export { routes };
