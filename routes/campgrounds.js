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

router.post("/", isLoggedIn, (req, res) => {
  var newCampground = req.body;
  newCampground.addedBy = {
    id: req.user._id,
    username: req.user.username
  };

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
router.get("/new", isLoggedIn, (req, res) => {
  res.render("new.ejs");
});

// SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
  var currentUser = req.user ? req.user.username : undefined;

  // find campground with :id
  Campground.findById(req.params.id)
  .populate("comments")
  .exec((err, campground) => {
    if (err) {
      console.log(err);
    } else {
      campground.currentUser = currentUser;
      res.render("show", {campground});
    }
  });
});

// Middleware - currently in two files (refactor)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
