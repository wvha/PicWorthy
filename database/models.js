const mongoose = require('mongoose');
const schemas = require('./schemas.js')

const Users = mongoose.model('Users', schemas.UserSchema);

const Pictures = mongoose.model('PicturesGeo', schemas.PictureSchema);

module.exports.Users = Users;
module.exports.Pictures = Pictures;