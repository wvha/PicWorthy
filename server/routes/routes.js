const router = require('express').Router();
const passport = require('../middleware/passport.js');
const controller = require('../controller/controller.js');

router.post('/signup', controller.handleSignup);

router.post('/login', function (req, res, next) {
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
});

// example of how to use router
// just pass in the url for the first argument
// pass in the controller clalback function as 2nd lineup
// router.post('/user', controller.lineups.post);

// router.get('/user', controller.lineups.get);

module.exports = router;