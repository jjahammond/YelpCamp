const express = require('express'),
      router  = express.Router();

const Campground = require('../models/campground');

router.get("/", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds});
    }
  });
});

router.post("/", (req, res) => {
  var newCampground = req.body;

  // Save to database
  Campground.create(newCampground, (err, newCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// /campgrounds/new must be declared before campgrounds/:id
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
  // find campground with :id
  Campground.findById(req.params.id)
  .populate("comments")
  .exec((err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground});
    }
  });
});

module.exports = router;
