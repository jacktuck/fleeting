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
* `peek(key) => value` return the value without bolstering its freshness
* `has(key) => value` return the presence of the key without bolstering its freshness
* `get(key) => value` return the value and bolsters its freshness
* `set(key, value) => value` add a node to the cache
* `del(key) => value` remove a node from the cache

## Usage
```javascript
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
    once we have 0-4 (5 nodes), we start to evict the least-recently-used nodes
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

/*
    This should be your output:

    Added node:  0
    Added node:  1
    Added node:  2
    Added node:  3
    Added node:  4
    Added node:  5
    Evicted node:  { k: 0, v: 0, stale: false }
    Added node:  6
    Evicted node:  { k: 1, v: 1, stale: false }
    Added node:  7
    Evicted node:  { k: 2, v: 2, stale: false }
    Added node:  8
    Evicted node:  { k: 3, v: 3, stale: false }
    Added node:  9
    Evicted node:  { k: 4, v: 4, stale: false }
    Getting node:  5
    Getting node:  6
    Getting node:  7
    Getting node:  8
    Getting node:  9
    Evicted node:  { k: 5, v: 5, stale: true }
    Evicted node:  { k: 6, v: 6, stale: true }
    Evicted node:  { k: 7, v: 7, stale: true }
    Evicted node:  { k: 8, v: 8, stale: true }
    Evicted node:  { k: 9, v: 9, stale: true }
*/
```
