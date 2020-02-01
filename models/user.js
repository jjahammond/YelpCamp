const mongoose = require('mongoose'),
      passsportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
userSchema.plugin(passsportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
