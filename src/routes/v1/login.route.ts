import { verifyPassword } from "../../utils/encyption";
import { prisma } from "../../client/prismaClient";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/test", async (req: Request, res: Response) => {
  res.json({
    token: "login_test",
  });
});

router.post("/", async (req: Request, res: Response)  => {
  const { email, password } = req.body;

  console.log({email,password})

  try {
    //find user
    const user  = await prisma.user.findFirst({
      where: {
        email,
      }
    })
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }
    //verify user
    const verifyPass = await verifyPassword(password, user.password);
    if (!verifyPass) {
      return res.status(401).json({
        message : "email or password doesn't match"
      })
    }

    return res.status(200).send(user)

  } catch (err) {
    console.log(err);
  }

  res.status(400).json({
    message: "an error occured"
  })

  // console.log(user)

})

export default router;
