import dotenv from "dotenv";
import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

const prisma = new PrismaClient();

// 新規ユーザーの登録
app.post("/api/auth/register", async (req, res) => {
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
app.post("/api/auth/login", async (req, res) => {
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

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
