const router = require('express').Router();
const controller = require('../controller/controller.js');

router.post('/signup', controller.post.signup);

router.post('/login', controller.post.login);

module.exports = router;