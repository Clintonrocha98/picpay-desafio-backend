import { Request, Response, Router } from "express";
import { userFactory } from "../factory/User/User.factory";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({ hello: "world" });
});
routes.post("/user", (req: Request, res: Response) =>
  userFactory().newUser(req, res)
);

export { routes };
