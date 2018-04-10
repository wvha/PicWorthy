const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// middleware
app.use(express.static(`${__dirname}/../client/dist`));
app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  JSON.stringify(req.body),
  '\n',
  tokens.res(req, res, 'content-length'),
  '-',
  tokens['response-time'](req,res),
  'ms'].join(' ')
));

const PORT = 3000;

app.listen(PORT, () => console.log(`listening to port ${PORT}`));