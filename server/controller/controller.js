const db = require ('../../database/database.js');
const passport = require('../middleware/passport.js');

module.exports.post = {};
module.exports.get = {};

module.exports.post.signup = (req, res) => {
  if (!db.saveUser(req.body)) {
    res.end('Username already exists')
  } else {
    res.end('User successfully created')
  }
};

module.exports.post.login = (req, res, next) => {
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

module.exports.get.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  console.log('session destroyed');
  res.redirect('/');
}

module.exports.get.loggedInYet = (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.json(req.user);
  } else {
    console.log('user not logged in');
  }
}