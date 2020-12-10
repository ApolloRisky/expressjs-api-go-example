const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const logger = require('./config/logger');
const error = require('./middlewares/error');
const mongoose = require('./config/mongoose');
const { env, port, morganLogFormat } = require('./config/vars');

const routes = require('./routes');

const app = express();

// request logging
app.use(morgan(morganLogFormat));

// parse body params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable cors
app.use(cors());

// mount api routes
app.use(routes);

// if error is not an instanceOf APIError, convert it
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// open mongodb connection
mongoose.connect();

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

module.exports = app;
