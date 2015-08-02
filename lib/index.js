module.exports = function (migration_files, next) {
  if (!migration_files) {
    next(new Error('Migration files not found.'));
  }
};
