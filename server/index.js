const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('./middleware/morgan');

const router = require('./routes/routes.js');

const app = express();

// middleware
app.use(express.static(`${__dirname}/../client/dist`));
app.use(morgan);

app.use('/', router);

const PORT = 3000;

app.listen(PORT, () => console.log(`listening to port ${PORT}`));