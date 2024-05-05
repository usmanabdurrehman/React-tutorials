import express from "express";
import OpenAI from "openai";

const app = express();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export const getInfo = async (message) => {
  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "gpt-3.5-turbo",
  });
  return response?.data?.choices?.[0]?.text;
};

app.get("/", async (req, res) => {
  const { message } = req.query;
  res.send(await getInfo(message));
});

app.listen(7000, () => {
  console.log("Server Running");
});
