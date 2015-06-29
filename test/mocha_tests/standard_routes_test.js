'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/prog_check_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var app = 'localhost:3000';
chai.use(chaihttp);

describe('The standards API', function() {

  var testingStandard = {
    'name': 'This Is A Test Standard',
    'grade': 'firstGrade',
    'code': '1.0.0.0',
    'language': 'addition',
    'keywords': ['addition', 'test', 'math'],
    'description': 'This is the description for a test. The description should be a bit longer'
  };

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  describe('Saving a standard', function() {

    it('Should save a standard', function(done) {
      chai.request(app)
        .post('/api/standards')
        .send(testingStandard)
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('grade');
          expect(res.body.code).to.equal('1.0.0.0');
          expect(res.body.keywords).to.have.length(3);
          done();
        });
    });
  });

  describe('Getting standards', function() {
    it('Should retrieve an array of standards', function(done) {
      chai.request(app)
        .get('/api/standards')
        .end(function(err, res) {
          expect(err).to.equal(null);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('name');
          done();
        });
    });
  });
});
