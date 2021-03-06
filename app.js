const express       = require('express'),
      dotenv        = require('dotenv'),
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
dotenv.config();

// Setup MongoDB through mongoose
const mongoDBURL = process.env.MONGODB_URL || "mongodb://localhost/yelp_camp";
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log("Connected to database");
}).catch(err => {
  console.log(err);
});


// Set middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(express.static(__dirname + "/public"));


// Setup session and initialize passport
app.use(session({
  secret: process.env.SECRET_KEY,
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

app.get('/*', (req,res) => {
  res.redirect("/campgrounds");
});

// Seed database
// seedDB();

// *************  Request listener *******************
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Server running on PORT 5000...")
});
