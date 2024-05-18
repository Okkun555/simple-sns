const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt")

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

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))