'use strict';

var through2 = require('through2'),
    spawn = require('child_process').spawn;

module.exports = function() {
  return through2(function(chunk, enc, callback) {
    var self = this;

    if(chunk.toString() === "\n") {
      self.push(chunk);
      callback();
    } else {
      var code = chunk.toString().replace(/\n$/, ''),
          childproc = spawn('chrome-cli', [
            'execute',
            //'(function(code) { try { return eval(code) } catch(e) { return e.constructor.name + ": " + e.message } })("' + code.replace(/"/g, '\\"') + '")'
            '(function() { try { return ' + code + ' } catch(e) { return e.constructor.name + ": " + e.message } })()'
          ]);

      childproc.on('error', function(e) {
        callback(e);
      });

      childproc.stdout.on('data', function(chunk) {
        self.push(chunk);
      });

      childproc.stdout.on('end', function(chunk) {
        callback();
      });
    }
  });
};

