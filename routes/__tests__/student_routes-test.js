'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/prog_check_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var port = process.env.PORT || 3002;
var app = 'localhost:' + port;
chai.use(chaihttp);

describe('The Student API', function() {
  var successfulStudent = {
    'firstName': 'Jonathan',
    'lastName': 'Ullberg',
    'pin': '1111'
  };

  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('Creating a Student', function() {
    it('Should create a student', function(done) {
      chai.request(app)
        .post('/api/students')
        .send(successfulStudent)
        .end(function(err, res) {
          expect(err).to.equal(null);
          done();
        });
    });
  });
});
