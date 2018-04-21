const db = require ('../../database/database.js');
const passport = require('../middleware/passport.js');

const post = {};
const get = {};
const patch = {};

post.signup = (req, res) => {
  if (!db.saveUser(req.body)) {
    res.end('Username already exists')
  } else {
    res.end('User successfully created')
  }
};

post.login = (req, res, next) => {
  console.log('attempting login ')
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
          console.log(user);
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
    console.log(req.user);
    res.json(req.user);
  } else {
    console.log('user not logged in');
  }
}

post.upload = function(req, res){
  console.log('uploading...');
  console.log(req.body);
  db.savePicture(req.body, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      db.savePictureToUser(data);
      res.sendStatus(200);
    }
  })
};

get.upload = function(req, res) {
  console.log('displaying...');
  db.selectAllPictures(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
};

patch.favorites = function(req, res) {
  db.addToFavorites(req.body)
    .then(() => {
      console.log('req body', req.body)
      return db.fetchUser(req.body.userData.username);
    })
    .then((data) => {
      console.log('data in controller', data)
      res.json(data);
    })
}

get.userLikes = (req, res) => {
  if (req.user) {
    db.fetchUserLikes(req.user)
      .then((result) => {
        console.log('data from getuserlikes', result);
        res.json(result);
      });
  } else {
    console.log('error in controller // get.userlikes');
  }
}

get.userPosts = (req, res) => {
  console.log('req.body is ', req.body);
  if (req.user) {
    db.getUserPosts(req.user.username, function (err, data) {
      console.log('err: ', err);
      console.log('this is data success: ', data);
      res.json(data);
    });
  }
}
  

module.exports.get = get;
module.exports.post = post;
module.exports.patch = patch;