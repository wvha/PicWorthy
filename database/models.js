const mongoose = require('mongoose');
const schemas = require('./schemas.js')

const Users = mongoose.model('Users', schemas.userSchema);

const Pictures = mongoose.model('Pictures', schemas.pictureSchema);

module.exports.Users = Users;
module.exports.Pictures = Pictures;