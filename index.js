require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");



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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

//Index Route
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));


//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
})

//Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

//Create Route
app.post("/listings", wrapAsync(async (req, res) => {
  if(!req.body.listing){
    throw new ExpressError(400, "send valid data for listing");
  };
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
  console.log(listing);
}));

//Update Route
app.put("/listings/:id", wrapAsync(async (req, res) => {
   if(!req.body.listing){
    throw new ExpressError(400, "send valid data for listing");
  };
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));



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

// Express Error
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something wnet wrong" } = err;
  res.status(statusCode).send(message);

});

app.listen(PORT, () => {
  console.log("Server is Listening to port", PORT);
});