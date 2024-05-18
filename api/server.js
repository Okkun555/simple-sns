require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express();
app.use(express.json())
const PORT = 8010;

const prisma = new PrismaClient();

// 新規ユーザーの登録
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  })

  return res.json(user);
})

// ユーザーログイン
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return res.status(401).json({ error: "メールアドレスまたはパスワードをご確認ください。" })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(401).json({ error: "メールアドレスまたはパスワードをご確認ください。" })
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  })
  return res.json({ token });
})


app.listen(PORT, () => console.log(`server is running on port ${PORT}`))