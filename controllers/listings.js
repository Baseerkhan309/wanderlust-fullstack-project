const Listing = require("../models/listing");
const { cloudinary } = require("../cloudConfig");

module.exports.searchListings = async (req, res) => {

    const { query } = req.query;
    const allListings = await Listing.find({
        $or: [
            { location: { $regex: query, $options: "i" } },
            { country: { $regex: query, $options: "i" } },
            { title: { $regex: query, $options: "i" } }
        ]
    });

    res.render("listings/index.ejs", {
        allListings,
        selectedCategory: "All Listings"
    });
};

module.exports.getSuggestions = async (req, res) => {
    const { query } = req.query;
    const suggestions = await Listing.find({
        $or: [
            { location: { $regex: query, $options: "i" } },
            { title: { $regex: query, $options: "i" } }
        ]
    })
        .select("title location")
        .limit(5);
    res.json(suggestions);
};
// Index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});

    res.render("listings/index.ejs", {
        allListings,
        selectedCategory: "All Listings"
    });
};


module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    let location = req.body.listing.location;
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
        {
            headers: {
                "User-Agent": "WanderLust-App"
            }
        }
    );
    if (!response.ok) {
        throw new Error("Geocoding failed");
    }
    const data = await response.json();
    if (data.length) {
        req.body.listing.geometry = {
            type: "Point",
            coordinates: [
                Number(data[0].lon),
                Number(data[0].lat)
            ]
        };
    }

    let listing = new Listing(req.body.listing);

    console.log(req.files);

    listing.images = req.files.map((file) => ({
        url: file.path,
        filename: file.filename,
    }));

    listing.owner = req.user._id;
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.images[0].url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });

}; module.exports.updateListing = async (req, res) => {


    let { id } = req.params;

    // get old listing first
    let listing = await Listing.findById(id);

    // update normal fields
    Object.assign(listing, req.body.listing);

    // if new images uploaded
    if (req.files && req.files.length > 0) {

        // delete old Cloudinary images
        for (let image of listing.images) {
            await cloudinary.uploader.destroy(image.filename);
        }

        // store new images
        listing.images = req.files.map((file) => ({

            url: file.path,

            filename: file.filename

        }));

    }
    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;

    // Find the listing first
    const listing = await Listing.findById(id);

    // Delete all images from Cloudinary
    for (let image of listing.images) {
        await cloudinary.uploader.destroy(image.filename);
    }

    // Delete the listing from MongoDB
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

module.exports.filterByCategory = async (req, res) => {
    const { category } = req.params;

    const allListings = await Listing.find({ category });

    res.render("listings/index.ejs", {
        allListings,
        selectedCategory: category
    });
};