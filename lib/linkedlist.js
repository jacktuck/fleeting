function LinkedList() {
  this._head = null;
  this._tail = null;
  this._length = 0;
}

function _yes() {
  return true;
}

LinkedList.prototype.get = function(predicate, reverse) {
  var node = (reverse) ? this._tail : this._head;

  predicate = predicate || _yes;

  for (var i = 0; node !== null && !predicate(node) && i < this._length; i++) {
    node = (reverse) ? node.prev : node.next;
  }

  return node;
};

LinkedList.prototype.unlink = function(node) {
  if (this._head === node) {
    this._head = node.next;
  }

  if (this._tail === node) {
    this._tail = node.prev;
  }

  if (node.prev !== null) {
    node.prev.next = node.next;
  }

  if (node.next !== null) {
    node.next.prev = node.prev;
  }

  this._length--;

  return node;
};

LinkedList.prototype.append = function(node) {
  if (this._length === 0) {
    this._head = node;
    this._tail = node;
  } else {
    this._tail.next = node;
    node.prev = this._tail;
    this._tail = node;
  }

  this._length++;
};

LinkedList.prototype.prepend = function(node) {
  if (this._length === 0) {
    this._head = node;
    this._tail = node;
  } else {
    this._head.prev = node;
    node.next = this._head;
    this._head = node;
  }

  this._length++;
};

LinkedList.prototype.attachHead = function(node) {
  if (!node || this._head === node) {
    return;
  }

  if (this._head === node) {
    this._head = node.next;
  }

  if (this._tail === node) {
    this._tail = node.prev;
  }

  if (node.prev !== null) {
    node.prev.next = node.next;
  }

  if (node.next !== null) {
    node.next.prev = node.prev;
  }

  this._head.prev = node;
  node.next = this._head;
  this._head = node;
};

LinkedList.prototype.attachTail = function(node) {
  if (!node || this._tail === node) {
    return;
  }

  if (this._head === node) {
    this._head = node.next;
  }

  if (this._tail === node) {
    this._tail = node.prev;
  }

  if (node.prev !== null) {
    node.prev.next = node.next;
  }

  if (node.next !== null) {
    node.next.prev = node.prev;
  }

  this._tail.next = node;
  node.prev = this._tail;
  this._tail = node;
};

module.exports = LinkedList;
