import "dotenv/config";
import "express-async-errors";
import { app } from "./config/express";

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
