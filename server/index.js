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
app.use(morgan);

app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use((res, req, next) => {debugger; console.log('got here'); next()})
app.use(passport.session());

app.use(express.static(`${__dirname}/../client/dist`));
app.use('/login', express.static(`${__dirname}/../client/dist`));
app.use('/signup', express.static(`${__dirname}/../client/dist`));
app.use(signupRedirect);
app.use('/locations', express.static(`${__dirname}/../client/dist`));
app.use('/', router);

const PORT = 3000;

//handle sample upload data post request to database

app.listen(PORT, () => console.log(`listening to port ${PORT}`));