'use strict';

require('../../../app/js/client');
require('angular-mocks');

describe('The question controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;
  var $filter;

  beforeEach(angular.mock.module('progCheck'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('Should be able to create a new controller', function() {
    var testCtrl = $ControllerConstructor('TestCtrl', {$scope: $scope});
    expect(typeof testCtrl).toBe('object');
  });

  describe('REST functionality', function() {
    var sampleTest = {
      'standardId': 'sampleStandardId',
      'testDirections': 'TD',
      'goalId': 'sample goal id',
      'questions': [{
        'question': 'TQ1',
        'correct': 'C',
        'answers': ['C', 'W1', 'W2', 'W3']
      }]
    };
    var sampleTestFinal = {
      '_id': 'sampleObjectId',
      'standardId': 'sampleStandardId',
      'testDirections': 'TD',
      'goalId': 'sample goal id',
      'questions': [{
        'question': 'TQ1',
        'correct': 'C',
        'answers': ['C', 'W1', 'W2', 'W3']
      }]
    };

    beforeEach(angular.mock.inject(function(_$httpBackend_, _$filter_) {
      $httpBackend = _$httpBackend_;
      $filter = _$filter_;
      this.testCtrl = $ControllerConstructor('testCtrl', {$scope: $scope});
      $scope.standard = {
        _id: 'sampleStandardId'
      };
      $scope.standards = [sampleTest];

    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.resetExpectations();
    });

    it('should make a get request on index', function() {
      $httpBackend.expectGET('/api/tests')
        .respond(200, [sampleTest]);
      $scope.getAll();
      $httpBackend.flush();
      expect(Array.isArray($scope.tests)).toBe(true);
      expect(typeof $scope.tests[0]).toBe('object');
      expect($scope.tests[0].testDirections).toBe('TD');
    });

    it('should be able to save a test', function() {
      $scope.isTestFormShowing = true;
      $httpBackend.expectPOST('/api/tests')
        .respond(200, sampleTestFinal);
      $scope.createTest(sampleTest);
      $httpBackend.flush();
      expect(typeof $scope.test).toBe('object');
      expect($scope.tests[0]._id).toBeDefined();
      expect($scope.isTestFormShowing).toBe(false);
      expect($scope.test).toBe(null);
    });

    it('should be able to update a test', function() {

    });
  });
});
