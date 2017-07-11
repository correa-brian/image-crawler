process.argv.push('dog');
const assert = require('chai').assert;
const crawlWebPage = require('../index');

describe('App', function(){
  this.timeout(2000);

  it('app result should be a Promise', function(done){
    setTimeout(function(){
      let result = crawlWebPage;
      assert.typeOf(result, 'Promise');
      done();
    }, 1500);
  });
});
