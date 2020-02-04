// middleware
const Campground    = require('../models/campground'),
      Comment       = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCampgroundOwnerShip = function(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if (err) {
        res.redirect("back");
      } else {
        if (campground.addedBy.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  }
}

middlewareObj.checkCommentOwnerShip = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.commentId, (err, comment) => {
      if (err) {
        res.redirect("back");
      } else {
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  }
}

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


module.exports = middlewareObj;
