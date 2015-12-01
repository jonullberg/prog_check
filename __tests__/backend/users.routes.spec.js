/**
 * The Tests for the all user routes pertaining to the Prog-Check API
 * Created by Jonathan Ullberg on 11/23/2015
 * Created with Mocha
 */
'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/prog_check_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var port = process.env.PORT || 3000;
var app = 'localhost:' + port;
var sinon = require('sinon');
chai.use(chaihttp);

describe('The login API', function() {
  var testUser = {
    'email': 'successTest@example.com',
    'password': 'foobar123',
    'firstName': 'Jonathan',
    'lastName': 'Testing',
    'role': 'teacher',
    'school': {
      'schoolName': 'Test School',
      'schoolState': 'WA',
      'schoolDistrict': 'school district'
    }
  };

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('POST to /create_user route', function() {
    it('Should create a user', function(done) {
      chai.request(app)
        .post('/api/create_user')
        .send(testUser)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });

  describe('GET to /sign_in', function() {
    beforeEach(function(done) {
      chai.request(app)
        .post('/api/create_user')
        .send(testUser)
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
          expect(res.body).to.have.property('token');
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

  describe('GET to /auth_token', function() {
    var token;
    beforeEach(function(done) {
      chai.request(app)
        .post('/api/create_user')
        .send(testUser)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });
    it('should auth a correct token', function(done) {
      chai.request(app)
        .get('/api/auth_token')
        .set({authorization: 'Bearer ' + token})
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.token).to.equal(token);
          done();
        });
    });
    it('should fail with an incorrect token', function(done) {
      chai.request(app)
        .get('/api/auth_token')
        .set({authorization: ''})
        .end(function(err, res) {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
  describe('POST to /forgot', function() {
    it('should')
  });
  describe('POST to /reset/:idToken', function() {
    it('should', function(done) {
      done();
    });
  });
  describe('GET to /users', function() {
    it('should return an array of users', function(done) {
      done();
    });
  });
  describe('PUT to /users/:userId', function() {
    it('should return a specific teacher', function(done) {
      done();
    });
  });
});
