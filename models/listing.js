const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: String,
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    set: (v) => (v === "" ? undefined : v),
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  location: {
    type: String,
    trim: true,
  },

  country: {
    type: String,
    trim: true,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
