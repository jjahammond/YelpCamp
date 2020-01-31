const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require("mongoose"),
      Campground  = require('./models/campground'),
      Comment     = require('./models/comment')
      seedDB      = require('./seeds');

// Setup MongoDB through mongoose
mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

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

app.post("/campgrounds/:id/comments", (req, res) => {
  // Get comment object from request
  var newComment = req.body;

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

app.listen(3000, () => {
  console.log("Server running...")
});
