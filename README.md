#Fleeting

A LRU (least-recently-used) in-memory cache for Node.js.

[![Coverage Status](https://coveralls.io/repos/github/jacktuck/fleeting/badge.svg?branch=master)](https://coveralls.io/github/jacktuck/fleeting?branch=master)
[![Build Status](https://travis-ci.org/jacktuck/fleeting.svg?branch=master)](https://travis-ci.org/jacktuck/fleeting)

## Installation

```
$ npm install fleeting
```

## API

* `purge()`
* `peek(key) => value`
* `has(key) => value`
* `get(key) => value`
* `set(key, value) => value`
* `del(key) => value`
