const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  photos: [{type: String}]
});

const pictureSchema = mongoose.Schema({
  category: String,
  location: String,
  imageURL: String,
  description: String
});

module.exports.userSchema = userSchema;
module.exports.pictureSchema = pictureSchema;

