const mongoose = require('mongoose');
const schemas = require('./schemas.js')

const Users = mongoose.model('PicWorthyUsers', schemas.UserSchema);

const Pictures = mongoose.model('PicWorthyPicturesGeo', schemas.PictureSchema);

module.exports.Users = Users;
module.exports.Pictures = Pictures;