const express       = require('express'),
      mongoose      = require("mongoose"),
      passport      = require('passport'),
      session       = require('express-session'),
      bodyParser    = require('body-parser'),
      methodOverride = require('method-override'),
      flash         = require('connect-flash'),
      LocalStrategy = require('passport-local').Strategy,
      Campground    = require('./models/campground'),
      Comment       = require('./models/comment'),
      User          = require('./models/user'),
      seedDB        = require('./seeds');

const commentRoutes    = require('./routes/comments'),
      campgroundRoutes = require('./routes/campgrounds'),
      authRoutes       = require('./routes/index');

const app = express();

// Setup MongoDB through mongoose
mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash());
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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Seed database
seedDB();

// *************  Request listener *******************
app.listen(3000, () => {
  console.log("Server running...")
});
