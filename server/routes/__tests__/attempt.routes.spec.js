'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/prog_check_test';
require('../../server');

var mocks = require('../../lib/mocks')
var sinon = require('sinon');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var port = process.env.PORT || 3000;
var app = 'localhost:' + port;
chai.use(chaihttp);

// Rewire for UNIT tests
var rewire = require('rewire');
var attemptRoutes = rewire('../attempt.routes');
var mockController = {
  createAttempt: function() {},
  deleteAttempt: function() {},
  getStudentAttempts: function() {}
}
attemptRoutes.__set__('bodyparser', mocks.mockBodyParser);
attemptRoutes.__set__('jwtAuth', mocks.mockJwtAuth);
attemptRoutes.__set__('attemptsController', mockController);

describe('The Attempts API', function() {
  var watchJwtAuth
  beforeEach(function() {
     watchJwtAuth = sinon.spy(mocks.mockJwtAuth);
  })
  describe('The attempt POST route', function() {
    it('should fire when receiving a POST request', function() {
    });
    it('sould call jwtAuth', function() {
      expect(watchJwtAuth.called).to.equal(false);
    });
    it('should call the attempt controller createAttempt() function', function() {

    });
  });
  describe('The attempt GET route', function() {
    it('should fire when receiving a GET request', function() {

    });
    it('sould call jwtAuth', function() {

    });
    it('should call the attempt controller getStudentAttempts() function', function() {

    });
  });
  describe('The attempt DELETE route', function() {
    it('should fire when receiving a DELETE request', function() {

    });
    it('sould call jwtAuth', function() {

    });
    it('should call the attempt controller deleteAttempt() function', function() {

    });
  });
});
