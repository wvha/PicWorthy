const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');

const schemas = require('./schemas.js');
const models = require('./models.js');
const db = require('./database.js');

mongoose.promise = Promise;
Promise.promisifyAll(bcrypt);

db.fetchUser = (username) =>  models.Users.findOne({username: username});

db.saveUser = (obj) => {
  return db.fetchUser(obj.username)
  .then((user) => {
    if (user === null) {
      const saltRounds = 10;
      return bcrypt.genSaltAsync(saltRounds)
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
    } else {
      return false;
    }
  })
};

db.savePicture = function (data) {
  console.log('saving picture', data);
  const newPic = new models.Pictures({
    category: data.category,
    location: data.location,
    imageURL: data.imageURL,
    description: data.description,
    username: data.username,
    user_id: data.user_id,
    loc: {
      type: 'Point',
      coordinates: [data.latLng.lat, data.latLng.lng]
    }
  });
  return newPic.save();
};

db.savePictureToUser = (data) =>
  models.Users.update(
    {_id: data.user_id},
    {$push: { photos: data._id}}
  );

const MAX_DISTANCE = 200000;

db.selectAllPictures = function(cb, location) {

  return models.Pictures.aggregate(
    [
      {$geoNear: {
        near: {
          type: 'Point',
          coordinates: [40, -83] //[location.lat, location.lng]
        },
        distanceField: 'distance',
        spherical: true,
        maxDistance: MAX_DISTANCE
      }}
    ]
  )
};

db.addToFavorites = (data) => {
  return models.Users.findByIdAndUpdate(data.userData._id, {$addToSet: {photos: data.details._id}}, {'new': true}, () => {}) 
}
// gets all posts from current user
db.getUserPosts = (username, callback) => {
  console.log('username is: ', username)
  models.Pictures.find({username: username}, function (err, pics) {
    console.log('this is pics:', pics);
    callback(err, pics);
    });
};

// queries user data for likes // to be fixed
db.fetchUserLikes = (userId) => {
  console.log('userid', userId._id)
  return models.Users.findOne({_id: userId._id})
    .populate('photos').exec()
 
};

module.exports = db;