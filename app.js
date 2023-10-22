const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to DB")
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
app.use(express.static(path.join(__dirname, "/public")))
app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
    res.send("Hii, I am root");
});

//Index Route 
app.get("/listings", async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", async(req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async(req, res) => {
    const newListing = new Listing(req.body.listing);
    console.log(newListing);
    await newListing.save();
    res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async(req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing });
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async(req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

// app.get("/testListing", (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the roadside",
//         price: 1500,
//         location: "calangute, Goa",
//         country: "India ",
//     });

//     sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(3000, () => {
    console.log(`App is listening on port 3000`);
});