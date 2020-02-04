const express = require('express'),
      router  = express.Router();

const Campground = require('../models/campground'),
      Comment    = require('../models/comment');

const middleware = require('../middleware'); // No need to add /index.js


router.get("/", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds});
    }
  });
});

router.post("/", middleware.isLoggedIn, (req, res) => {
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
      req.flash("success", "Campground created!");
      res.redirect("/campgrounds");
    }
  });
});

// /campgrounds/new must be declared before campgrounds/:id
router.get("/new", middleware.isLoggedIn, (req, res) => {
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
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    } else {
      if (campground === null) {
        req.flash("error", "Campground not found");
        res.redirect("/campgrounds");
      } else {
        campground.currentUser = currentUser;
        res.render("show", {campground});
      }
    }
  });
});

router.put("/:id", middleware.checkCampgroundOwnerShip, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body, (err, updatedCampground) => {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Campground successfully updated");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

router.delete("/:id", middleware.checkCampgroundOwnerShip, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      campground.comments.forEach(commentId => {
        Comment.findByIdAndRemove(commentId, err => {
          if (err) {
            console.log(err);
          }
        });
      });

      Campground.findByIdAndRemove(req.params.id, err => {
        if (err) {
          req.flash("error", "Sorry, something went wrong");
          res.redirect("/campgrounds");
        } else {
          req.flash("success", "Campground deleted!");
          res.redirect("/campgrounds");
        }
      });
    }
  });
});


module.exports = router;
