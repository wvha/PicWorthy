const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  photos: [{ type: Schema.Types.ObjectId, ref: 'photos' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'photos'}],
});

const mockPhotoSchema = mongoose.Schema({
  url: String,
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports.userSchema = userSchema;
module.exports.mockPhotoSchema = mockPhotoSchema;

// http://mongoosejs.com/docs/populate.html
