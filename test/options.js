var util = require('util');

var chai = require('chai');
var expect = chai.expect;
var Fleeting = require('../index');
var fleeting = new Fleeting({});

beforeEach(function() {
  fleeting.purge();
});

describe('fleeting', function() {
  describe('max', function() {
    it('should evict LRU nodes from caches', function() {
      fleeting._max = 50;

      for (i = 0; i < 100; i++) {
        expect(fleeting.set(i, i)).to.equal(i);
        expect(fleeting.get(i)).to.equal(i);
      }

      expect(fleeting._linkedlist._head.data.k).to.equal(99);
      expect(fleeting._linkedlist._tail.data.k).to.equal(50);
      expect(fleeting._length).to.equal(50);
    });
  });

  describe('ttl', function() {
    it('should evict stale nodes from caches', function(done) {
      fleeting = new Fleeting({
        ttl: 10
      });

      for (var i = 0; i < 5; i++) {
        expect(fleeting.set(i, i)).to.equal(i);
      }

      setTimeout(function() {
        for (var i = 0; i < 5; i++) {
          expect(fleeting.get(i)).to.equal(i);
        }
      }, 15);

      setTimeout(function() {
        expect(fleeting._linkedlist._head).to.equal(null);
        expect(fleeting._linkedlist._tail).to.equal(null);
        expect(fleeting._length).to.equal(0);
        done();
      }, 20);
    });
  });
});
