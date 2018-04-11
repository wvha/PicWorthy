const db = require ('../../database/database.js');

const handleSignup = (req, res) => {
  console.log('im in contoller handleSignup');
  console.log('req body', req.body);
  db.saveUser(req.body)
  res.end();
};

module.exports.handleSignup = handleSignup;