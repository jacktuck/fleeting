var Fleeting = require('../index.js');
var fleeting = new Fleeting({
  ttl: 3000,
  max: 5
});

fleeting.on('evicted', function(value) {
  console.log('evicted -> value', value);
});

for (var i = 0; i < 10; i++) {
  console.log('set -> ', i, ': ', fleeting.set(i, i));
}

for (var i = 0; i < 10; i++) {
  console.log('get -> ', i, ': ', fleeting.get(i));
}

setTimeout(function() {
  for (var i = 5; i < 10; i++) {
    console.log('get (now expired) -> ', i, ': ', fleeting.get(i));
  }
}, 3000);
