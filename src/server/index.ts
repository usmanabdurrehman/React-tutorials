import express from "express";
import cors from "cors";
import { pokemons } from "./data.js";
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.get("/pokemon", (req, res) => {
  res.send(pokemons);
});

app.listen(7000, () => {
  console.log("Server is running");
});
