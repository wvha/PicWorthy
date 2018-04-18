const noLoginRequired = [
  '/',
  '/login',
  '/signup',
];

const signupRedirect = (req, res, next) => {
//  if (req.user || noLoginRequired.includes(req.url)) {
  if (true) { // comment this line out and uncomment previus line in production;
    next();
  } else {
    res.redirect('/signup');
  }
};

module.exports = signupRedirect;