const express = require('express'),
      router  = express.Router({mergeParams: true});

const Campground = require('../models/campground'),
      Comment    = require('../models/comment');

router.post("/", isLoggedIn, (req, res) => {
  // Create comment object from request
  var newComment = {text: req.body.text};
  newComment.author = {
    id: req.user._id,
    username: req.user.username
  };
  console.log(newComment);

  // Save to database
  Comment.create(newComment, (err, newCreated) => {
    if (err) {
      console.log(err);
    } else {
      // Now find correct campground to add to
      Campground.findById(req.params.id, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          // Now push newCreated into campground
          campground.comments.push(newCreated);
          campground.save();
          console.log("Comment added ");
          // Now redirect to campground SHOW page
          res.redirect("/campgrounds/" + req.params.id);
        }
      });
    }
  });
});

router.get("/:commentId/edit", (req, res) => {

});

// Middleware - currently in two files (refactor)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
