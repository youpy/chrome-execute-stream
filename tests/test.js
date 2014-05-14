var assert = require('assert'),
    chromeStream = require('..');

describe('chrome-cli-stream', function() {
  describe('evaluation', function() {
    it('evaluates javascript', function(done) {
      var stream = chromeStream();

      stream.once('data', function(chunk) {
        assert.equal(chunk.toString(), "123\n");
        done();
      });

      stream.write('123');
    });

    context('newline is passed', function() {
      it('writes a newline', function(done) {
        var stream = chromeStream();

        stream.once('data', function(chunk) {
          assert.equal(chunk.toString(), "\n");
          done();
        });

        stream.write("\n");
      });
    });

    context('undefined reference is passed', function() {
      it('writes an error message', function(done) {
        var stream = chromeStream();

        stream.once('data', function(chunk) {
          assert.equal(chunk.toString(), "ReferenceError: xxx is not defined\n");
          done();
        });

        stream.write('xxx');
      });
    });

    context('single quote is included', function() {
      it('writes a result', function(done) {
        var stream = chromeStream();

        stream.once('data', function(chunk) {
          assert.equal(chunk.toString(), "xx\n");
          done();
        });

        stream.write("'x' + 'x'");
      });
    });

    context('double quote is included', function() {
      it('writes a result', function(done) {
        var stream = chromeStream();

        stream.once('data', function(chunk) {
          assert.equal(chunk.toString(), "xx\n");
          done();
        });

        stream.write('"x" + "x"');
      });
    });
  });
});
