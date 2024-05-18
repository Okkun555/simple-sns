import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/auth";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
