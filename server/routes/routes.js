const router = require('express').Router();

const controller = require('../controller/controller.js');

// example of how to use router
// just pass in the url for the first argument
// pass in the controller clalback function as 2nd lineup
// router.post('/user', controller.lineups.post);

// router.get('/user', controller.lineups.get);

module.exports = router;