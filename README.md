#Fleeting

A LRU (least-recently-used) in-memory cache for Node.js.

[![Coverage Status](https://coveralls.io/repos/github/jacktuck/fleeting/badge.svg?branch=master)](https://coveralls.io/github/jacktuck/fleeting?branch=master)
[![Build Status](https://travis-ci.org/jacktuck/fleeting.svg?branch=master)](https://travis-ci.org/jacktuck/fleeting)

## Installation

```
$ npm install fleeting
```

## API

* `purge()` drop the entire cache
* `peek(key) => value` return the value without bolsting its freshness
* `has(key) => value` return the presence of the key without bolsting its freshness
* `get(key) => value` return the value and bolsters its freshness
* `set(key, value) => value` add an item to the cache
* `del(key) => value` remove an item from the cache

## Usage
```
var Fleeting = require('fleeting');

/*
    Here we set a ttl of 3 seconds and the max number of nodes to 5
*/
var fleeting = new Fleeting({
  ttl: 3000,
  max: 5
});

fleeting.on('evicted', function(i) {
  console.log('Evicted node: ', i);
});

/*
    Add 10 nodes to the cache with 0-9 as their keys and values. Notice that
    once we have 0-4 (5 nodes), we start to evict them least-recently-used nodes
    to make way for nodes 5-9.
*/
for (var i = 0; i < 10; i++) {
  console.log('Added node: ', i);
  fleeting.set(i, i);
}

/*
    At this point, we are left with nodes 5-9, which should also be evicted
    once they expire. Here we're expiring after 3 seconds, so I do a setTimeout
    to execute a .get on nodes 5-9 in 3 seconds time.
*/
setTimeout(function() {
  for (var i = 5; i < 10; i++) {
    console.log('Getting node: ', i);
    fleeting.get(i);
  }
}, 3000);

```
