const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const morgan = require('./middleware/morgan');
const session = require('./middleware/session');
const passport = require('./middleware/passport');
const loggedOutRedirect = require('./middleware/loggedOutRedirect.js');
const router = require('./routes/routes.js');
const reactRoutes = require('./routes/reactRoutes.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan);
app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(loggedOutRedirect);

const reactApp = express.static(`${__dirname}/../client/dist`);
reactRoutes.forEach((r) => app.use(r, reactApp));

app.use('/', router);

const PORT = process.env.PORT || 3000;

// only start server when not running tests
if (require.main === module) {
  app.listen(PORT, () => console.log(`listening to port ${PORT}`));
}

module.exports = app;