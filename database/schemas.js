const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  photos: [{ type: Schema.Types.ObjectId, ref: 'photos' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'photos'}],
});

const pictureSchema = mongoose.Schema({
  category: String,
  location: String,
  imageURL: String,
  description: String
});

module.exports.userSchema = userSchema;
module.exports.pictureSchema = pictureSchema;

// http://mongoosejs.com/docs/populate.html
const mockPhotoSchema = mongoose.Schema({
  url: String,
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});
