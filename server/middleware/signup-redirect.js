const noLoginRequired = [
  '/',
  '/login',
  '/signup',
];

const signupRedirect = (req, res, next) => {
  if (req.user || noLoginRequired.includes(req.url)) {
    next();
  } else {
    res.redirect('/signup');
  }
};

module.exports = signupRedirect;