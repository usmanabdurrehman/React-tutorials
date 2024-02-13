import express from "express";
import cors from "cors";
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
];

let users = [...initialUsers];

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.get("/initial", (req, res) => {
  users = [...initialUsers];
  res.send(users);
});

app.get("/users", (req, res) => {
  const { limit } = req.query;
  res.send(users.slice(0, limit ?? users.length));
});

app.post("/users", (req, res) => {
  const newUser = { ...req.body, id: users.length + 1 };
  users.push(newUser);
  setTimeout(() => {
    res.send({ user: newUser });
  }, 800);
});

app.listen(7000, () => {
  console.log("listening on port 7000");
});
