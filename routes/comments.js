const express = require('express'),
      router  = express.Router({mergeParams: true});

const Campground = require('../models/campground'),
      Comment    = require('../models/comment');

const middleware = require('../middleware'); // No need to add /index.js

router.post("/", middleware.isLoggedIn, (req, res) => {
  // Create comment object from request
  var newComment = {text: req.body.text};
  newComment.author = {
    id: req.user._id,
    username: req.user.username
  };

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

          // Now redirect to campground SHOW page
          res.redirect("/campgrounds/" + req.params.id);
        }
      });
    }
  });
});


router.put("/:commentId", middleware.checkCommentOwnerShip, (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body, (err, updatedComment) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});


router.delete("/:commentId", middleware.checkCommentOwnerShip, (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId, (err) => {
    res.redirect("/campgrounds/" + req.params.id);
  });
});


module.exports = router;
