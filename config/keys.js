if (process.env.NODE_ENV === 'production') {
  // we are in production - return prod keys
  module.exports = require('.prod');
} else {
  // we are in development - return dev keys
  module.exports = require('./keys');
}
