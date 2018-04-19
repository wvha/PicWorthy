const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const morgan = require('./middleware/morgan');
const pictures = require('../database/database.js');
const session = require('./middleware/session');
const passport = require('./middleware/passport');
const signupRedirect = require('./middleware/signup-redirect.js');
const router = require('./routes/routes.js');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan); // automatically logs data

// authentication middleware
app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// the express.static is telling express to serve up the react app
app.use('/', express.static(`${__dirname}/../client/dist`));
app.use('/login', express.static(`${__dirname}/../client/dist`));
app.use('/signup', express.static(`${__dirname}/../client/dist`));

// anything after signupRedirect requires a login
app.use(signupRedirect);
app.use('/locations', express.static(`${__dirname}/../client/dist`));
app.use('/', router);

const PORT = 3000;

app.listen(PORT, () => console.log(`listening to port ${PORT}`));