const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pictures'}]
});

const pictureSchema = mongoose.Schema({
  category: String,
  location: String,
  imageURL: String,
  description: String,
  username: String,
  user_id: String,
});

const Users = mongoose.model('Users', userSchema);
const Pictures = mongoose.model('Pictures', pictureSchema);

module.exports.userSchema = userSchema;
module.exports.pictureSchema = pictureSchema;