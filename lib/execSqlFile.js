var logger = require('trucktrack-logging');
var async = require('async');
var pg = require('pg');
var fs = require('fs');
var path = require('path');

module.exports = function(config, next) {
  if (!config) {
    return next(new Error('No configuration found.'));
  }
  if (!config.file) {
    return next(new Error('File not found'));
  }
  if (!config.dbUrl) {
    return next(new Error('No database connection found in given configuration.'));
  }
  var file = path.resolve(process.cwd(), config.file);
  fs.readFile(file, function(err, result) {
    if (err) {
      return next(err);
    }
    var queries = result.toString()
      .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
      .replace(/\s+/g, ' ') // excess white space
      .split(";") // split into all statements
      .map(Function.prototype.call, String.prototype.trim)
      .filter(function(el) {
        return el.length != 0
      });
    logger.debug('Found queries: ', queries);
    var migrations = [];
    queries.forEach(function(query) {
      migrations.push(function(callback) {
        pg.connect('postgres://' + config.dbUrl, function(err, client, done) {
          if (err) {
            callback(err);
            done();
            return;
          }
          client.query(query, function(err, result) {
            if (err) {
              callback(err);
              done();
              return;
            }
            callback(null, result);
          });
        });
      });
    });
    async.waterfall(migrations, function(err, results) {
      if (err) {
        return next(err);
      }
      next(null, results);
    });
  })
}
