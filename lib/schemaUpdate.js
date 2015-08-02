var logger = require('trucktrack-logger');

module.exports = function (migration_files_path, next) {
  if (!migration_files_path) {
    next(new Error('Migration files not found.'));
  }
  
};
