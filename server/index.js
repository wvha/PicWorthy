const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const morgan = require('./middleware/morgan');
const pictures = require('../database/database.js');
const session = require('./middleware/session');
const passport = require('./middleware/passport');

const router = require('./routes/routes.js');


const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan);
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use(express.static(`${__dirname}/../client/dist`));
app.use('/login', express.static(`${__dirname}/../client/dist`));
app.use('/signup', express.static(`${__dirname}/../client/dist`));
app.use('/locations', express.static(`${__dirname}/../client/dist`));

const PORT = 3000;

//handle sample upload data post request to database

app.listen(PORT, () => console.log(`listening to port ${PORT}`));