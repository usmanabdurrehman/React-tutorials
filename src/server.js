import express from "express";
import cors from "cors";
import { pokemons } from "./data.js";
const app = express();
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const secretKey = "secret";

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use("/pokemon", (req, res, next) => {
  const accessToken = req.headers?.["authorization"];
  const refreshToken = req.cookies?.["refreshToken"];

  if (!accessToken && !refreshToken) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
});
app.get("/pokemon/all", (req, res) => {
  res.send({ pokemons });
});

app.get("/pokemon/stats", (req, res) => {
  res.send({ numPokemons: pokemons.length, types: ["fire", "water", "grass"] });
});

app.post("/pokemon/stat", (req, res) => {
  res.send({ message: "Stat created" });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "john.doe",
  };

  const accessToken = jwt.sign({ user }, secretKey, { expiresIn: "5000" });
  const refreshToken = jwt.sign({ user }, secretKey, { expiresIn: "1d" });

  res
    .cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    })
    .send({ user, token: accessToken });
});

app.post("/refresh-token", (req, res) => {
  const refreshToken = req.cookies?.["refreshToken"];

  try {
    const decoded = jwt.verify(refreshToken, secretKey);
    const accessToken = jwt.sign({ user: decoded.user }, secretKey, {
      expiresIn: "5000",
    });

    res.send({ user: decoded.user, token: accessToken });
  } catch (error) {
    return res.sendStatus(401);
  }
});

app.listen(7000, () => {
  console.log("Server is running");
});
