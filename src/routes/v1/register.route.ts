import { Request, Response, Router } from "express";
import { prisma } from "../../client/prismaClient";
import { encryptPassword } from "@app/utils/encyption";
// import { encryptPassword } from "../../utils/encyption";




const router = Router();

router.get("/test", async (req: Request, res: Response) => {
  res.json({
    token: "register_test",
  });
});

router.post("/create", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hashedPassword = await encryptPassword(password);
  //Check if the user already exists
  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  })
  if (user) {
    return res.status(409).json({
      message: 'User already exist'
    });
  }

  //create a new user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password : hashedPassword ,
    },
  });

  res.json({
    name,
    email,
  });

  // res.send("success");
});

export default router;
