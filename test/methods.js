var util = require('util');

var chai = require('chai');
var expect = chai.expect;
var Fleeting = require('../index');
var fleeting;

beforeEach(function() {
  fleeting = new Fleeting({});
});

describe('fleeting', function() {
  describe('set', function() {
    it('should insert node at head', function() {
      expect(fleeting.set('k1', 'v1')).to.equal('v1');
    });
  });

  describe('purge', function() {
    it('should purge caches', function() {
      expect(fleeting._cache).to.deep.equal({});
      expect(fleeting._linkedlist._length).to.equal(0);
    });
  });

  describe('del', function() {
    it('should delete node', function() {
      fleeting.set('k1', 'v1');
      fleeting.set('k2', 'v2');
      fleeting.set('k3', 'v3');

      expect(fleeting.del('k3')).to.equal('v3');
      expect(fleeting.del('k2')).to.equal('v2');
    });

    it('should try to delete non-existant node', function() {
      expect(fleeting.del('k1')).to.equal(undefined);
    });
  });

  describe('get', function() {
    it('should get value of node', function() {
      fleeting.set('k1', 'v1');
      fleeting.set('k2', 'v2');

      expect(fleeting.get('k2')).to.equal('v2');
    });

    it('should bolster node to head', function(done) {
      fleeting.set('k1', 'v1');
      fleeting.set('k2', 'v2');

      expect(fleeting.get('k1')).to.equal('v1');

      setTimeout(function() {
        expect(fleeting._linkedlist._head.data.k).to.equal('k1');
        done();
      }, 50);
    });

    it('should try to get non-existant node', function() {
      expect(fleeting.get('k')).to.equal(undefined);
    });
  });

  describe('peek', function() {
    it('should get value of node', function() {
      fleeting.set('k1', 'v1');

      expect(fleeting.peek('k1')).to.equal('v1');
    });

    it('should not bolster node to head', function(done) {
      fleeting.set('k1', 'v1');
      fleeting.set('k2', 'v2');

      fleeting.peek('k1');

      setTimeout(function() {
        expect(fleeting._linkedlist._head.data.k).to.equal('k2');
        expect(fleeting._linkedlist._head.data.k).to.not.equal('k1');
        done();
      }, 50);
    });
  });

  describe('has', function() {
    it('should check if node is existent', function() {
      fleeting.set('k1', 'v1');

      expect(fleeting.has('k1')).to.equal(true);
      expect(fleeting.has('k2')).to.equal(false);
    });

    it('should not bolster node to head', function() {
      expect(fleeting.set('k1', 'v1')).to.equal('v1');
      expect(fleeting.set('k2', 'v2')).to.equal('v2');

      expect(fleeting.has('k1')).to.equal(true);

      expect(fleeting._linkedlist._head.data.k).to.not.equal('k1');
    });
  });
});
