const mongoose = require('mongoose');
const schemas = require('./schemas.js')

const Users = mongoose.model('Users', schemas.userSchema);

module.exports.Users = Users;