const mongoose = require('mongoose');
const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');

const schemas = require('./schemas.js');
const models = require('./models.js');

// just allows mongoose functions to return promises
mongoose.promise = Promise;
Promise.promisifyAll(bcrypt);

const DB_URL = 'mongodb://localhost/PicWorthy';
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', () => console.log('error connecting to database!'));
db.once('open', () => console.log('connection successful!'));

const saveUser = (obj) => {
  const saltRounds = 10;

  bcrypt.genSaltAsync(saltRounds)
    .then ((salt) => {
      return bcrypt.hashAsync(obj.password, salt, null)
      .then ((hash) => {
        obj.password = hash;
        return models.Users.create({
          firstName: obj.firstName,
          lastName: obj.lastName,
          username: obj.username,
          password: obj.password
        }, (err) => {
          console.log(err);
        });
      })
      .catch((err) => 
        console.log(err)
      )
  }) 
};

const fetchUser = (username) => {
  return models.Users.find({username: username})
}

module.exports = db;
module.exports.saveUser = saveUser;
module.exports.fetchUser = fetchUser;