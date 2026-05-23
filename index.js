require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

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

 app.get("/listings", (req, res)=>{
  Listing.find({}).then((res)=>{
      console.log(res);
       
  });
 });

// app.get("/testListing", async (req, res)=>{
//      let sampleListing = new listing({
//       title : "My New Villa",
//       description : "By the beach",
//       price : 3000,
//       location : "kpk, Swat",
//       country : "Pakistan",
//      });

//      await sampleListing.save();
//      console.log("sample was save");
//      res.send("successful testing");
     
// });

app.listen(PORT, () => {
  console.log("Server is Listening to port", PORT);
});