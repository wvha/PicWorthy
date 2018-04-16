const session = require('express-session');

module.exports = session({
  secret: 'christinasamwillcwillh',
  resave: true,
  saveUninitialized: true
});