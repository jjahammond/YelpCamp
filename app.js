const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require("mongoose");

// Setup MongoDB through mongoose
mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//  name: "Fairview Cottage",
//  image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c7d2f78d4914fc55a_340.jpg",
//  description: "A lovely little cottage, you can't stay in. You will be camping."
// }, (err, campground) => {
//  if (err) {
//    console.log(err);
//  } else {
//    console.log(campground);
//  }
// });

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));

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

app.get("/campgrounds/:id", (req, res) => {
  // find campground with :id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground});
    }
  });
});

app.listen(3000, () => {
  console.log("Server running...")
});
