const router = require('express').Router();
const controller = require('../controller/controller.js');

router.post('/signup', controller.post.signup);

router.post('/login', controller.post.login);

router.get('/logout', controller.get.logout);

router.get('/loggedInYet', controller.get.loggedInYet);

router.post('/upload', controller.post.upload);

router.get('/upload', controller.get.upload);

module.exports = router;