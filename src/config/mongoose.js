const mongoose = require('mongoose');

const logger = require('./logger');
const { mongo, env } = require('./vars');

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

if (env === 'development') {
  mongoose.set('debug', true);
}

exports.connect = () => {
  mongoose.connect(mongo.uri, mongo.options).then(() => console.log('MongoDB connected successfully'));
};
