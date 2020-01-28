const express = require('express');
const app = express();

const bodyParser = require('body-parser');

var campgrounds = [
  {name: "Salmon Creek", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c7d2f7add9148c551_340.jpg"},
  {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2f7add9148c551_340.jpg"},
  {name: "Moutain Goats Rest", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2f7add9148c551_340.jpg"}
];

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds});
});

app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);

  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(3000, () => {
  console.log("Server running...")
});
