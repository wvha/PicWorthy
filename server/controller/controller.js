const db = require ('../../database/database.js');
const passport = require('../middleware/passport.js');

const post = {};
const get = {};
const patch = {};

post.signup = (req, res) => {
  db.saveUser(req.body)
    .then((result) => {
      result === false ? res.sendStatus(422) : res.sendStatus(200);
    })
};

post.login = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err || !user) {
      res.status(422).send(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function (err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
};

get.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  return res.redirect('/');
}

get.loggedInYet = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } 
}

post.upload = (req, res) => 
  db.savePicture(req.body)
    .then((data) => db.savePictureToUser(data))
    .then(() => res.end())
    .catch((err) => {
      console.log('error uploading photo', err);
      res.status(500).send('error uploading photo')
    });

get.upload = function(req, res) {
  console.log('displaying...');
  db.selectAllPictures({lat: 0, lng: 0})
    .then((pictures) => {
      console.log('sending pictures', pictures);
      res.json(pictures);
    });
};

patch.favorites = function(req, res) {
  db.addToFavorites(req.body)
    .then(() => {
      return db.fetchUser(req.body.userData.username);
    })
    .then((data) => {
      res.json(data);
    })
}

get.userLikes = (req, res) => {
  if (req.user) {
    db.fetchUserLikes(req.user)
      .then((result) => {
        res.json(result);
      });
  } 
}

get.userPosts = (req, res) => {
  if (req.user) {
    db.getUserPosts(req.user.username, function (err, data) {
      res.json(data);
    });
  }
}
  

module.exports.get = get;
module.exports.post = post;
module.exports.patch = patch;