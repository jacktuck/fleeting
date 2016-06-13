var util = require('util');

var chai = require('chai');
var expect = chai.expect;
var Fleeting = require('../index');
var fleeting = new Fleeting({});

beforeEach(function() {
  fleeting.purge();
});

describe('fleeting', function() {
  describe('set', function() {
    it('should insert node at head', function() {
      fleeting.set(1, 1);
      expect(fleeting._linkedlist._head.data.k).to.equal(1);
    });
  });

  describe('purge', function() {
    it('should purge caches', function() {
      expect(fleeting._cache).to.deep.equal({});
      expect(fleeting._linkedlist._head).to.equal(null);
      expect(fleeting._linkedlist._tail).to.equal(null);
    });
  });

  describe('del', function() {
    it('should delete node', function() {
      fleeting.set(1, 1);
      fleeting.del(1);

      expect(fleeting._linkedlist._head).to.equal(null);
      expect(fleeting._linkedlist._tail).to.equal(null);
    });
  });

  describe('get', function() {
    it('should get value of node', function() {
      fleeting.set(5, 5);

      expect(fleeting.get(5)).to.equal(5);
      expect(fleeting.get(1)).to.equal(undefined);
    });

    it('should bolster node to head', function(done) {
      fleeting.set(1, 1);
      fleeting.set(2, 2);

      fleeting.get(2, 2);

      setTimeout(function() {
        expect(fleeting._linkedlist._head.data.k).to.equal(2);
        done();
      }, 50);
    });
  });

  describe('peek', function() {
    it('should get value of node', function() {
      fleeting.set(5, 5);

      expect(fleeting.peek(5)).to.equal(5);
    });

    it('should not bolster node to head', function(done) {
      fleeting.set(1, 1);
      fleeting.set(2, 2);

      fleeting.peek();

      setTimeout(function() {
        expect(fleeting._linkedlist._head.data.k).to.not.equal(1);
        done();
      }, 50);
    });
  });

  describe('has', function() {
    it('should check if node is existent', function() {
      fleeting.set(1, 1);

      expect(fleeting.has(1)).to.equal(true);
      expect(fleeting.has(2)).to.equal(false);
    });

    it('should not bolster node to head', function() {
      fleeting.set(1, 1);
      fleeting.set(2, 2);

      fleeting.has(1);

      expect(fleeting._linkedlist._head.data.k).to.not.equal(1);
    });
  });
});
