const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-Parser');

const morgan = require('./middleware/morgan');
const session = require('./middleware/session');
let passport = require('./middleware/passport');

const router = require('./routes/routes.js');

const app = express();

// middleware
app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan);

app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

const PORT = 3000;

app.listen(PORT, () => console.log(`listening to port ${PORT}`));