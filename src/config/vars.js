const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGODB_URI,
    options: {
      keepAlive: 1,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  },
  morganLogFormat: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
