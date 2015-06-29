'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/prog_check_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var app = 'localhost:3000';
chai.use(chaihttp);

var User = require('../../models/User');

describe('The login API', function() {
  var successfulTestUser = {
    'username': 'successfulTestUsername',
    'email': 'successTest@example.com',
    'password': 'foobar123'
  };

  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('Creating a user', function() {
    it('Should create a user and return a token', function(done) {
      chai.request(app)
        .post('/api/create_user')
        .send(successfulTestUser)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });

  describe('Logging in a user', function() {
    beforeEach(function(done) {
      chai.request(app)
        .post('/api/create_user')
        .send(successfulTestUser)
        .end(function(err, res) {
          done();
        });
    });
    it('Should log in a user and return a token', function(done) {
      chai.request(app)
        .get('/api/sign_in')
        .auth('successTest@example.com', 'foobar123')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.body.username).to.equal('successfulTestUsername');
          expect(res.body).to.have.property('token');
          expect(res.body.msg).to.equal('authenticated as: successTest@example.com')
          done();
        });
    });

    it('Should fail to log in with wrong password', function(done) {
      chai.request(app)
        .get('/api/sign_in')
        .auth('successTest@example.com', 'foobar124')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res).to.have.status(500);
          expect(res.text).to.equal('Wrong Password\n');
          done();
        });
    });

    it('Should fail to log in with a wrong email', function(done) {
      chai.request(app)
        .get('/api/sign_in')
        .auth('failTest@example.com', 'foobar123')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res).to.have.status(500);
          expect(res.text).to.equal('No such user\n');
          done();
        });
    });
  });
});
