
var rm = require('rimraf').sync;
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var packagejson = require('..');

describe('metalsmith-packagejson', function(){

  it('should have package.json keys', function(done){
    rm('test/fixtures/simple/build');
    var m = Metalsmith('test/fixtures/simple')
      .use(markdown({}))
      .use(packagejson({}))
      .use(templates({
        engine: 'swig',
        directory: 'templates'
      }));

    m.build(function(err){
      if (err) return done(err);
      equal('test/fixtures/simple/build', 'test/fixtures/simple/expected');
      done();
    });
  });

  it('should have merge application package.json keys', function(done){
    rm('test/fixtures/merge/build');
    var m = Metalsmith('test/fixtures/merge')
      .use(markdown({}))
      .use(packagejson({}))
      .use(templates({
        engine: 'swig',
        directory: 'templates'
      }));

    m.build(function(err){
      if (err) return done(err);
      equal('test/fixtures/merge/build', 'test/fixtures/merge/expected');
      done();
    });
  });
});
