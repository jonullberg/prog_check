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

describe('The standards API', function() {
  var testUser = {
    'email': 'successTest@example.com',
    'password': 'foobar123',
    'firstName': 'Jonathan',
    'lastName': 'Testing'
  };
  var successfulStandard = {
    'name': 'This Is A Test Standard',
    'gradeName': 'firstGrade',
    'shortGrade': '1st',
    'code': '1.0.0.0',
    'domain': 'test domain',
    'language': 'This is the description for a test. The description should be a bit longer',
    'goals': [{
      'name': 'Test Goal',
      'description': 'test description'
    }]
  };
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
  afterEach(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('Saving a standard', function() {

    it('Should save a standard', function(done) {
      chai.request(app)
        .post('/api/standards')
        .set({token: token})
        .send(successfulStandard)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.body).to.have.property('name');
          expect(res.body.code).to.equal('1.0.0.0');
          done();
        });
    });
  });

  describe('Getting standards', function() {
    beforeEach(function(done) {
      chai.request(app)
        .post('/api/standards')
        .set({token: token})
        .send(successfulStandard)
        .end(function(err, res) {
          done();
        });
    });

    it('Should retrieve an array of standards', function(done) {
      chai.request(app)
        .get('/api/standards')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.body).to.be.an('array');
          expect(res.body[0].gradeName).to.equal('firstGrade');
          done();
        });
    });
  });
});
