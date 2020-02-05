const express = require('express'),
      router  = express.Router(),
      passport = require('passport');

const User = require('../models/user');

router.get("/", (req, res) => {
  res.render("landing");
});

// GET - Login route
router.get("/login", (req, res) => {
  res.render("login");
});

// POST - Handle Login request
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}));

// GET - Sign up route
router.get("/signup", (req, res) => {
  res.render("signup");
});

// POST - Handle Sign up request
router.post("/signup", (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    } else {
      req.flash("success", "You're signed up as " + user.username + "! Now you can login");
      res.redirect("/login");
    }
  });
});

// GET - Handle logout logic, redirect to Index
router.get("/logout", (req, res) => {
  // Handle logout here
  req.logout();
  console.log("User logged out");
  req.flash("success", "You Logged Out!")
  res.redirect("/campgrounds");
});

module.exports = router;
