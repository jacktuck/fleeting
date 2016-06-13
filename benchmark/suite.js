var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var Fleeting = require('../index');
var fleeting = new Fleeting({});

// add tests
suite
.add('fleeting#set', function() {
  fleeting.set(1, 1);
})
.add('fleeting#peek', function() {
  fleeting.peek(1);
})
.add('fleeting#has', function() {
  fleeting.has(1);
})
.add('fleeting#get', function() {
  fleeting.get(1);
})
.add('fleeting#del', function() {
  fleeting.del(1);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
// run async
.run({ 'async': false });
