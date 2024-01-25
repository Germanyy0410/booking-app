import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { default as mongoose } from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
app.use(express.json());

const bcryptSalt = bcrypt.genSaltSync(12);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("\nApp connected to database");
    console.log(`Server has started on port http://localhost:4000\n`);
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      email,
      name,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const isPasswordOk = bcrypt.compareSync(password, userDoc.password);
    if (isPasswordOk) {
      jwt.sign({ email: userDoc.email })
      res.json("Password OK.");
    } else {
      res.status(422).json("Password not OK.");
    }
  } else {
    res.json("User not found.");
  }
});

app.listen(4000);
