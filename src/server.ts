import "dotenv/config";
import "express-async-errors";
import { app } from "./config/express";
import { UserRepository } from "./repository/User/User.Repository";

const port = 3000;

const repo = new UserRepository();


app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
