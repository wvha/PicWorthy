const db = require ('../../database/database.js');

const handleSignup = (req, res) => {
  if (!db.saveUser(req.body)) {
    res.end('Username already exists')
  } else {
    res.end('User successfully created')
  }
};

module.exports.handleSignup = handleSignup;