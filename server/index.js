const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('./middleware/morgan');

const router = require('./routes/routes.js');

const app = express();

// middleware
app.use(morgan);

app.use('/', router);
app.use('/', express.static(`${__dirname}/../client/dist`));
app.use('/signup', express.static(`${__dirname}/../client/dist`));
app.use('/login', express.static(`${__dirname}/../client/dist`));

const PORT = 3000;

app.listen(PORT, () => console.log(`listening to port ${PORT}`));