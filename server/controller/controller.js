const db = require ('../../database/database.js');

const handleSignup = (req, res) => {
  db.saveUser(req.body)
  res.end();
};

module.exports.handleSignup = handleSignup;