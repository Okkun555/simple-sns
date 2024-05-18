import { Router } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

// 新規ユーザーの登録
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return res.json(user);
});

// ユーザーログイン
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res
      .status(401)
      .json({ error: "メールアドレスまたはパスワードをご確認ください。" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ error: "メールアドレスまたはパスワードをご確認ください。" });
  }

  const secretKey = process.env.SECRET_KEY as string;
  const token = jwt.sign({ id: user.id }, secretKey, {
    expiresIn: "1d",
  });
  return res.json({ token });
});

module.exports = router;
