const dotenv = require("dotenv");
const express = require("express");
const authRoute = require("./routes/auth");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
