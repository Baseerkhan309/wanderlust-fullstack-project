const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
    },
    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG, PNG and WEBP images are allowed"));
        }
    }
});


router.route("/").get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.array("listing[images]", 3), validateListing, wrapAsync(listingController.createListing));



//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Search Route
router.get("/search", wrapAsync(listingController.searchListings));

//suggestions:
router.get(
    "/suggestions", wrapAsync(listingController.getSuggestions)
);

//category Route
router.get(
    "/category/:category",
    wrapAsync(listingController.filterByCategory)
);

//Dynamic route
router.route("/:id").get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.array("listing[images]", 3), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;