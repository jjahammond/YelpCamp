const express       = require('express'),
      mongoose      = require("mongoose"),
      passport      = require('passport'),
      session       = require('express-session'),
      bodyParser    = require('body-parser'),
      LocalStrategy = require('passport-local').Strategy,
      Campground    = require('./models/campground'),
      Comment       = require('./models/comment'),
      User          = require('./models/user'),
      seedDB        = require('./seeds');

const app = express();

// Setup MongoDB through mongoose
mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Setup session and initialize passport
app.use(session({
  secret: 'kimi raikkonen',
  resave: false,
  saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Custom middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

// Seed database
seedDB();

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds});
    }
  });
});

app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
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

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
  // Get comment object from request
  var newComment = {text: req.body.text, author: req.user.username};

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

// ********** AUTHENTICATION ROUTES ****************

// GET - Login route
app.get("/login", (req, res) => {
  res.render("login");
});

// POST - Handle Login request
app.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}));

// GET - Sign up route
app.get("/signup", (req, res) => {
  res.render("signup");
});

// POST - Handle Sign up request
app.post("/signup", (req, res) => {
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
app.get("/logout", (req, res) => {
  // Handle logout here
  req.logout();
  console.log("User logged out");
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// *************  Request listener *******************
app.listen(3000, () => {
  console.log("Server running...")
});
