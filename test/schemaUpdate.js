var expect = require('chai').expect,
    migrations = require('..');

describe('migrations', function() {
  it('should say hello', function(done) {
    expect(migrations()).to.equal('Hello, world');
    done();
  });
});
