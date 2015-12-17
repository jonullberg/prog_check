'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/prog_check_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var port = process.env.PORT || 3000;
var app = 'localhost:' + port;
chai.use(chaihttp);

describe('The Test API', function () {
  var token;
  var id;
  var mockUser = {
    'email': 'successTest@example.com',
    'password': 'foobar123',
    'firstName': 'Jonathan',
    'lastName': 'Testing',
    'role': 'teacher',
    'school': {
      'schoolName': 'Test School',
      'schoolState': 'WA',
      'schoolDistrict': 'Test District'
    }
  };

  var mockTest = {
    'standardId': 'standardId',
    'testDirections': 'Sample directions for test',
    'goalId': 'goalId',
    'questionType': 'text',
    'answerType': 'text',
    'fractions': false,
    'dateCreated': Date.now(),
    'questions': [{
      'question': 'testQuestion',
      'correct': 'C',
      'answers': ['C', '1', '2', '3'],
      'dateCreated': Date.now()
    }]
  };

  beforeEach(function(done) {
    chai.request(app)
      .post('/api/create_user')
      .send(mockUser)
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

  describe('POST to /tests', function () {
    it('Should return a test', function(done) {
      chai.request(app)
        .post('/api/tests')
        .set({authorization: 'Bearer ' + token})
        .send(mockTest)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.body.test).to.have.property('_id');
          expect(res.body.test).to.have.property('testName');
          expect(res.body.test.testName).to.equal('Test 1');
          done();
        });
    });
  });

  describe('Get, update and delete tests', function() {

    beforeEach(function(done) {
      chai.request(app)
        .post('/api/tests')
        .set({authorization: 'Bearer ' + token})
        .send(mockTest)
        .end(function(err, res) {
          id = res.body.test._id;
          done();
        });
    });

    describe('Get /tests', function() {

      it('Should get an array of tests', function(done) {
        chai.request(app)
          .get('/api/tests')
          .set({authorization: 'Bearer ' + token})
          .end(function(err, res) {
            expect(Array.isArray(res.body.tests)).to.equal(true);
            expect(typeof res.body.tests[0]).to.equal('object');
            expect(res.body.tests[0]).to.have.property('_id');
            done();
          });

      });
    });

    describe('Update tests', function() {
      var newTest = {
        'standardId': 'updatedStandardId',
        'testDirections': 'Sample directions for test',
        'goalId': 'updatedGoalId',
        'questions': [{
          'question': 'testQuestion',
          'correct': 'C',
          'answers': ['C', '1', '2', '3']
        }]
      };
      it('Should update a single test', function(done) {
        chai.request(app)
          .put('/api/tests/' + id)
          .set({authorization: 'Bearer ' + token})
          .send(newTest)
          .end(function(err, res) {
            expect(res.body.test.standardId).to.equal('updatedStandardId');
            done();
          });

      });
    });

    describe('Deleting a test', function() {
      it('Should delete a single test', function(done) {
        chai.request(app)
          .delete('/api/tests/' + id)
          .set({authorization: 'Bearer ' + token})
          .end(function(err, res) {
            expect(res.body.msg).to.equal('Success');
            done();
          });
      });
    });
  });
});
