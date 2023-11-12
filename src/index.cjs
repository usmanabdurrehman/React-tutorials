const express = require("express");
const app = express();
const cors = require("cors");
const { default: axios } = require("axios");

app.set("port", process.env.PORT || 7000);

app.use(cors());

app.get("/", async (req, res) => {
  const { data } = await axios.get("https://test-cors-server.glitch.me/");
  res.send(data);
});

app.listen(app.get("port"), () => {
  console.log("Server running on PORT 7000");
});
