import { config } from "dotenv";
config();

import express, { NextFunction, Request, Response } from "express";
import "./src/client/prismaClient";

const port = process.env.PORT || 5111;

const app = express();

import v1_register from "./src/routes/v1/register.route";
import v1_login from "./src/routes/v1/login.route";

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("Hello from the server");
  res.json({
    status: "Welcome to express yo hi how you doin? yo",
  });
});

//routes
app.use("/v1/register", v1_register);
app.use("/v1/login", v1_login);

app.listen(port, () => {
  console.log(`Server listening to ${port}`);
});
