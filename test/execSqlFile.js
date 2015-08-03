var expect = require('chai').expect,
    execSqlFile = require('../lib/execSqlFile');

describe('execSqlFile', function() {
  it('should throw error if config is missing', function(done) {
    execSqlFile(null, function (err, results) {
      expect(err).to.deep.equal(new Error('No file found.'));
      done();
    });
  });
  it('should throw error if sql file is missing', function(done) {
    execSqlFile({
      dbUrl: 'trucktrack:trucktrack@localhost:5432/ifta_dev'
    }, function (err, results) {
      expect(err).to.deep.equal(new Error('File not found'));
      done();
    });
  });
  it('should throw error if sql file is not found', function(done) {
    execSqlFile({
      file: 'test/test.sql',
      dbUrl: 'trucktrack:trucktrack@localhost:5432/ifta_dev'
    }, function (err, results) {
      expect(err).to.deep.equal(new Error('File not found'))  ;
      done();
    });
  });
  it('should execute sql statements', function(done) {
    execSqlFile({
      file: 'test/sql/test.sql',
      dbUrl: 'trucktrack:trucktrack@localhost:5432/ifta_dev'
    }, function (err, results) {
      expect(results).to.be.defined;
      done();
    });
  });
});
