const mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      Comment    = require('./models/comment');

var data = [
  {
    name: "Clouds Rest",
    image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Lovely"
  },
  {
    name: "Desert Mesa",
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
    description: "Lovely."
  },
  {
    name: "Snowy Sense",
    image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
    description: "Lovely"
  },
  {
    name: "Social Wood",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
    description: "Lovely"
  }
];


function seedDB() {
  // Remove all campgrounds
  Campground.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      // Remove all comments
      Comment.deleteMany({}, (err) => {
        if (err) {
          console.log(err);
        } else {
          // Add some campgrounds
          data.forEach((campground) => {
            Campground.create(campground, (err, campground) => {
              if (err) {
                console.log(err);
              } else {
                Comment.create({
                  text: "This place is great, but I wish there was internet",
                  author: "Homer"
                }, function (err, comment) {
                  if (err) {
                    console.log(err);
                  } else {
                    campground.comments.push(comment);
                    campground.save();
                  }
                });
              }
            });
          });
        }
      });
    }
  });


}

module.exports = seedDB;
