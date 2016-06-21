var util = require('util');
var EventEmitter = require('events').EventEmitter;
var LinkedList = require('./lib/linkedlist');
var linkedlist = new LinkedList();

function Fleeting(opts) {
  opts = (Object.prototype.toString.call(opts) === '[object Object]') ? opts : {};

  this._max = (opts.max > 0) ? parseInt(opts.max) : Infinity;
  this._ttl = (opts.ttl > 0) ? parseInt(opts.ttl) : false;

  this._cache = {};

  Object.defineProperties(this, {
    '_length': {
      get: function() {
        return linkedlist._length;
      }
    },
    '_linkedlist': {
      get: function() {
        return linkedlist;
      }
    }
  });
}

util.inherits(Fleeting, EventEmitter);

Fleeting.prototype._Node = function(k, v) {
  var node = {
    data: {
      k: k,
      v: v
    },
    next: null,
    prev: null
  };

  var ttl = this._ttl;

  if (ttl > 0) {
    node.exp = Date.now() + ttl;
  }

  node.constructor = this._Node;
  return node;
};

function nodeByKey(k, node) {
  return node.data.k === k;
}

function stale(node) {
  return node.exp < Date.now();
}

Fleeting.prototype.purge = function(k) {
  this._cache = {};
  linkedlist = new LinkedList();
};

Fleeting.prototype.peek = function(k) {
  return this._cache[k];
};

Fleeting.prototype.has = function(k) {
  return this._cache[k] === undefined ? false : true;
};

Fleeting.prototype.get = function(k) {
  var cachedNode = this._cache[k];

  if (cachedNode !== undefined) {
    setImmediate(function() {
      var node = linkedlist.get(nodeByKey.bind(null, k));

      if (!node) {
        return;
      }

      if (stale(node)) {
        this.del(node);
        this.emit('evicted', {
          k: node.data.k,
          v: node.data.v,
          stale: true
        });
      } else {
        linkedlist.attachHead(node);
      }
    }.bind(this));
  }

  return cachedNode;
};

Fleeting.prototype.set = function(k, v) {
  var node = this._Node(k, v);

  if (linkedlist._length >= this._max) {
    var eviction = linkedlist.get(null, true);

    if (eviction) {
      this.del(eviction);
      this.emit('evicted', {
        k: eviction.data.k,
        v: eviction.data.v,
        stale: false
      });
    }
  }

  this._cache[k] = v;
  linkedlist.prepend(node);

  return node.data.v;
};

Fleeting.prototype.del = function(node) {
  if (node.constructor !== this._Node) {
    node = linkedlist.get(nodeByKey.bind(null, node));
  }

  if (!node) {
    return;
  }

  linkedlist.unlink(node);
  delete this._cache[node.data.k];

  return node.data.v;
};

module.exports = Fleeting;
