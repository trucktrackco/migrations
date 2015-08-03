var logger = require('trucktrack-logging');

module.exports = function (config, next) {
  if (!next) {
    return null;
  }
  if (!config.files) {
    next(new Error('Migration files not found.'));
  }
};
