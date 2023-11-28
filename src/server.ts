import express from "express";
import cors from "cors";
import { User } from "./types";
const app = express();

const initialUsers = [
  {
    id: 1,
    name: "Graham",
  },
  {
    id: 2,
    name: "Patricia",
  },
  {
    id: 3,
    name: "Clement",
  },
];

let users: User[] = initialUsers;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.get("/initial", (req, res) => {
  users = initialUsers;
  res.send(users);
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  const newUser = { ...req.body, id: users.length + 1 };
  users.push(newUser);
  setTimeout(() => {
    res.send({ user: newUser });
  }, 2000);
});

app.post("/users/error", (req, res) => {
  setTimeout(() => {
    res.send(500);
  }, 2000);
});

app.listen(7000, () => {
  console.log("listening on port 7000");
});
