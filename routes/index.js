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
  User.register(new User({username: req.body.username}), req.body.password, (err) => {
    if (err) {
      console.log(err);
      res.render("signup");
    } else {
      console.log("User registered");
      res.redirect("/campgrounds");
    }
  });
});

// GET - Handle logout logic, redirect to Index
router.get("/logout", (req, res) => {
  // Handle logout here
  req.logout();
  console.log("User logged out");
  res.redirect("/campgrounds");
});

// Middleware - currently in two files (refactor)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
