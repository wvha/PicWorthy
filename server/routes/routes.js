const router = require('express').Router();
const passport = require('../middleware/passport.js');
const controller = require('../controller/controller.js');

router.post('/signup', controller.handleSignup);

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
  })
);
// example of how to use router
// just pass in the url for the first argument
// pass in the controller clalback function as 2nd lineup
// router.post('/user', controller.lineups.post);

// router.get('/user', controller.lineups.get);

module.exports = router;