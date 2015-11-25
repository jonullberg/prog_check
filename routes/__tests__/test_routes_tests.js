'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/prog_check_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var app = 'localhost:3000';
chai.use(chaihttp);

describe('The Test API', function () {
  var token;
  var id;
  var testUser = {
    'email': 'successTest@example.com',
    'password': 'foobar123',
    'firstName': 'Jonathan',
    'lastName': 'Testing'
  };

  var successfulTest = {
    'standardId': 'testId',
    'testDirections': 'Sample directions for test',
    'goalId': 'testId',
    'questions': [{
      'question': 'testQuestion',
      'correct': 'C',
      'answers': ['C', '1', '2', '3']
    }]
  };

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

  describe('Create a test', function () {
    it('Should save a test', function(done) {
      chai.request(app)
        .post('/api/tests')
        .set({token: token})
        .send(successfulTest)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('testName');
          expect(res.body.testName).to.equal('Test 1');
          done();
        });
    });
  });

  describe('Get, update and delete tests', function() {

    beforeEach(function(done) {
      chai.request(app)
        .post('/api/tests')
        .set({token: token})
        .send(successfulTest)
        .end(function(err, res) {
          id = res.body._id;
          done();
        });
    });

    describe('Get tests', function() {

      it('Should get an array of tests', function(done) {
        chai.request(app)
          .get('/api/tests')
          .set({token: token})
          .end(function(err, res) {
            expect(Array.isArray(res.body)).to.equal(true);
            expect(typeof res.body[0]).to.equal('object');
            expect(res.body[0]).to.have.property('_id');
            done();
          });

      });
    });

    describe('Update tests', function() {
      var newTest = {
        'standardId': 'testId',
        'testDirections': 'Sample directions for test',
        'goalId': 'testId',
        'questions': [{
          'question': 'testQuestion',
          'correct': 'C',
          'answers': ['C', '1', '2', '3']
        }]
      };
      it('Should update a single test', function(done) {
        chai.request(app)
          .put('/api/tests/' + id)
          .set({token: token})
          .send(newTest)
          .end(function(err, res) {
            expect(res.body.msg).to.equal('Success');
            done();
          });

      });
    });

    describe('Deleting a test', function() {
      it('Should delete a single test', function(done) {
        chai.request(app)
          .delete('/api/tests/' + id)
          .set({token: token})
          .end(function(err, res) {
            expect(res.body.msg).to.equal('Success');
            done();
          });
      });
    });
  });
});
