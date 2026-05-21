require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Read from .env
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.listen(PORT, () => {
  console.log("Server is Listening to port", PORT);
});