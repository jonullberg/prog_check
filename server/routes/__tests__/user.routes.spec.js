/**
 * The Tests for the all user routes pertaining to the Prog-Check API
 * Created by Jonathan Ullberg on 11/23/2015
 * Created with Mocha
 */
'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost:3001/prog_check_test';
process.env.NODE_ENV = 'TEST';
require('../../server');

var rewire = require('rewire');
var mockRouter = {
  use: function() {},
  post: function() {},
  put: function() {},
  get: function() {},
  delete: function() {}
};
var mockPassport = {
  authenticate: function() {}
};
var userRoutes = require('../user.routes.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var port = process.env.PORT || 3002;
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

  describe('POST to /create_user route', function() {
    it('Should call the createUser() function', function(done) {
      chai.request(app)
        .post('/api/create_user')
        .send(testUser)
        .end(function(err, res) {
          console.log(res.status);
          console.log(res.body);
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });

//   describe('GET to /sign_in', function() {
//     beforeEach(function(done) {
//       chai.request(app)
//         .post('/api/create_user')
//         .send(testUser)
//         .end(function(err, res) {
//           done();
//         });
//     });
//     it('Should log in a user and return a token', function(done) {
//       chai.request(app)
//         .get('/api/sign_in')
//         .auth('successTest@example.com', 'foobar123')
//         .end(function(err, res) {
//           expect(err).to.equal(null);
//           expect(res.body).to.have.property('token');
//           done();
//         });
//     });

//     it('Should fail to log in with wrong password', function(done) {
//       chai.request(app)
//         .get('/api/sign_in')
//         .auth('successTest@example.com', 'foobar124')
//         .end(function(err, res) {
//           expect(err).to.equal(null);
//           expect(res).to.have.status(500);
//           expect(res.text).to.equal('Wrong Password\n');
//           done();
//         });
//     });

//     it('Should fail to log in with a wrong email', function(done) {
//       chai.request(app)
//         .get('/api/sign_in')
//         .auth('failTest@example.com', 'foobar123')
//         .end(function(err, res) {
//           expect(err).to.equal(null);
//           expect(res).to.have.status(500);
//           expect(res.text).to.equal('No such user\n');
//           done();
//         });
//     });
//   });

//   describe('GET to /auth_token', function() {
//     it('should auth a correct token', function(done) {
//       chai.request(app)
//         .get('/api/auth_token')
//         .set({authorization: 'Bearer ' + token})
//         .end(function(err, res) {
//           expect(res.status).to.equal(200);
//           expect(res.body.token).to.equal(token);
//           done();
//         });
//     });
//     it('should fail with an incorrect token', function(done) {
//       chai.request(app)
//         .get('/api/auth_token')
//         .set({authorization: ''})
//         .end(function(err, res) {
//           expect(res.status).to.equal(401);
//           done();
//         });
//     });
//   });
//   describe('POST to /forgot', function() {
//     // it('should call nodemailer.createTransport and should call the transport sendmail function', function(done) {
//     //   var nodemailer = require('nodemailer');
//     //   var mockSendMail = sinon.spy();
//     //   var stubbedCreateTransport = sinon.stub(nodemailer, 'createTransport', function() {
//     //     return {
//     //       sendMail: mockSendMail
//     //     }
//     //   });
//     //   expect(mockSendMail.called).to.equal(false);
//     //   expect(stubbedCreateTransport.called).to.equal(false);
//     //   chai.request(app)
//     //     .post('/api/forgot')
//     //     .set({authorization: 'Bearer ' + token})
//     //     .end(function(err, res) {
//     //       expect(stubbedCreateTransport.called).to.equal(true);
//     //       expect(mockSendMail.called).to.equal(true);
//     //       nodemailer.createTransport.restore();
//     //       done();
//     //     });
//     // });
//   });
//   describe('POST to /reset/:idToken', function() {
//     // var resetToken;
//     // beforeEach(function(done) {
//     //   chai.request(app)
//     //     .post('/api/forgot')
//     //     .send({email: 'successTest@example.com'})
//     //     .end(function(err, res) {
//     //       done();
//     //     });
//     });
//     it('should search for a user with req.body.email', function(done) {
//       var User = require('../../models/User');
//       var mockFindOne = sinon.stub()
//       done();
//     });
//   });
  // describe('GET to /users', function() {
  //   it('should return an array of users', function(done) {
  //     done();
  //   });
  // });
  // describe('PUT to /users/:userId', function() {
  //   it('should return a specific teacher', function(done) {
  //     done();
  //   });
  // });
});
