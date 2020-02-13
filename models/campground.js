const mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  contact: String,
  phone: String,
  address: String,
  price: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  addedBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
}, {timestamps: true});


// Getter
campgroundSchema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
campgroundSchema.path('price').set(function(num) {
  return num * 100;
});

module.exports = mongoose.model("Campground", campgroundSchema);
