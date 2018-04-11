const mongoose = require('mongoose');
const Promise = require('bluebird');

const schemas = require('./schemas.js');
const models = require('./models.js');

// just allows mongoose functions to return promises
mongoose.promise = Promise;

const DB_URL = 'mongodb://localhost/PicWorthy';
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', () => console.log('error connecting to database!'));
db.once('open', () => console.log('connection successful!'));

const saveUser = (obj) => {
  console.log('this is is obj', obj)
  models.Users.create({
    firstName: obj.firstName,
    lastName: obj.lastName,
    username: obj.username,
    password: obj.password
  }, (err) => {
    console.log(err);
  });
}

module.exports = db;
module.exports.saveUser = saveUser;
