const express       = require('express'),
      mongoose      = require("mongoose"),
      passport      = require('passport'),
      session       = require('express-session'),
      bodyParser    = require('body-parser'),
      methodOverride = require('method-override'),
      flash         = require('connect-flash'),
      timeout       = require('connect-timeout'),
      LocalStrategy = require('passport-local').Strategy,
      Campground    = require('./models/campground'),
      Comment       = require('./models/comment'),
      User          = require('./models/user'),
      seedDB        = require('./seeds');

const commentRoutes    = require('./routes/comments'),
      campgroundRoutes = require('./routes/campgrounds'),
      authRoutes       = require('./routes/index');

const app = express();
//app.use(timeout('5s'));

// Setup MongoDB through mongoose
// Atlas: mongodb+srv://jjahammond:<password>@yelpcluster-7ejmm.mongodb.net/test?retryWrites=true&w=majority
// Local: mongodb://localhost/yelp_camp
mongoose.connect("mongodb+srv://jjahammond:KmXW2kuFMBX97aDU@yelpcluster-7ejmm.mongodb.net", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch(err => {
  console.log(err);
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://jjahammond:KmXW2kuFMBX97aDU@yelpcluster-7ejmm.mongodb.net";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// client.connect(err => {
//   if (err) {
//     console.log(err)
//   } else {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
//   }
// });

// Set middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//app.use(haltOnTimedout);
app.use(methodOverride('_method'));
//app.use(haltOnTimedout);
app.use(flash());
//app.use(haltOnTimedout);
app.use(express.static(__dirname + "/public"));
//app.use(haltOnTimedout);

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

app.get('/*', (req,res) => {
  res.redirect("/campgrounds");
});

// Seed database
//seedDB();

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

// *************  Request listener *******************
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server running...")
});
