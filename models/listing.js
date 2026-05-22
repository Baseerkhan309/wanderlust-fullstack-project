const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    default:
      "https://unsplash.com/photos/the-night-sky-with-stars-above-a-mountain-range-a",
    type: String,
    set: (v) =>
      v == ""
        ? "https://unsplash.com/photos/the-night-sky-with-stars-above-a-mountain-range-a"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
