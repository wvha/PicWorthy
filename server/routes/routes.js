const router = require('express').Router();
const controller = require('../controller/controller.js');

router.post('/api/signup', controller.post.signup);

router.post('/api/login', controller.post.login);

router.get('/api/logout', controller.get.logout);

router.get('/api/loggedInYet', controller.get.loggedInYet);

router.post('/api/upload', controller.post.upload);

router.get('/api/closestPics', controller.get.closestPics);

router.patch('/api/favorites', controller.patch.favorites);

router.get('/api/likes', controller.get.userLikes);

router.get('/api/userposts', controller.get.userPosts);

module.exports = router;