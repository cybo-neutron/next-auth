import { Request, Response, Router } from "express";
import { prisma } from "../../client/prismaClient";

const router = Router();

router.get("/test", async (req: Request, res: Response) => {
  res.json({
    token: "register_test",
  });
});

router.post("/create", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  //Check if the user already exists
  const user = await prisma.user.findFirst({
    where: {
      email,
      password
  }})

  //create a new user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  res.json({
    name,
    email,
    password,
  });

  // res.send("success");
});

export default router;
