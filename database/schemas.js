const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  photos: [String],

  // implement populate vvv 
  // photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pictures' }],
  // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pictures'}],
});

const GeoSchema = new mongoose.Schema({
  type: {
    default: 'Point',
    type: String
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

const PictureSchema = new mongoose.Schema({
  category: String,
  location: String,
  imageURL: String,
  description: String,
  username: String,
  user_id: String,
  geometry: GeoSchema
  // likedBy: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
});

// are these ever used?
const Users = mongoose.model('Users', UserSchema);
const Pictures = mongoose.model('Pictures', PictureSchema);

module.exports.UserSchema = UserSchema;
module.exports.PictureSchema = PictureSchema;

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
