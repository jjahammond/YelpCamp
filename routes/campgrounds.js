const express = require('express'),
      router  = express.Router();

const Campground = require('../models/campground'),
      Comment    = require('../models/comment');

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

router.put("/:id", (req, res) => {
  console.log("Put Request");
  console.log(req.params.id);
  console.log(req.body);

  Campground.findByIdAndUpdate(req.params.id, req.body, (err, updatedCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

router.delete("/:id", (req, res) => {
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
          res.redirect("/campgrounds");
        } else {
          res.redirect("/campgrounds");
        }
      });
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
