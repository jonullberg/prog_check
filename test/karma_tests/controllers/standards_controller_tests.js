'use strict';

require('../../../app/js/client');
require('angular-mocks');

describe('The standards controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('progCheck'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('Should be able to create a new controller', function() {
    var standardsCtrl = $ControllerConstructor('standardsCtrl', {$scope: $scope});
    expect(typeof standardsCtrl).toBe('object');
  });

  describe('The REST functionality', function() {

  });
});
