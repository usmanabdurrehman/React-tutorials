import express from "express";
import cors from "cors";
import { timeout } from "./utils.js";
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.get("/users", async (req, res) => {
  await timeout(1000);
  res.send([
    { id: 1, name: "Alex" },
    { id: 2, name: "Bob" },
  ]);
});

app.get("/error", async (req, res) => {
  await timeout(1000);
  res.sendStatus(500);
});

app.listen(7000, () => {
  console.log("listening on port 7000");
});
