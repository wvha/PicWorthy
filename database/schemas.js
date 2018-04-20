const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pictures' }],
  // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pictures'}],
});

const pictureSchema = mongoose.Schema({
  category: String,
  location: String,
  imageURL: String,
  description: String,
  username: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  // likedBy: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
});

const Users = mongoose.model('Users', userSchema);
const Pictures = mongoose.model('Pictures', pictureSchema);

module.exports.userSchema = userSchema;
module.exports.pictureSchema = pictureSchema;

// http://mongoosejs.com/docs/populate.html
// const mockPhotoSchema = mongoose.Schema({
//   url: String,
//   likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   user: { type: Schema.Types.ObjectId, ref: 'User' }
// });

// const pictureSchema = mongoose.Schema({
//   category: String,
//   location: String,
//   imageURL: String,
//   description: String,
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
//   likedBy: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
// });
