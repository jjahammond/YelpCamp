const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require("mongoose"),
      Campground  = require("./models/campground"),
      seedDB      = require("./seeds");

// Setup MongoDB through mongoose
mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

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
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name, image, description};

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
      console.log(campground);
      res.render("show", {campground});
    }
  });
});

app.listen(3000, () => {
  console.log("Server running...")
});
