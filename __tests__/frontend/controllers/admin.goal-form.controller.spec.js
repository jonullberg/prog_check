/**
 * The unit tests for the Admin Goal Form controller
 * Created by Jonathan Ullberg on 11/25/2015
 */
'use strict';
console.log = function() {}
require('../../../app/js/client.js');
require('angular-mocks');

describe('The Admin Goal Form controller', function() {
  beforeEach(angular.mock.module('progCheck'));
  var scope;
  var $ControllerConstructor;
  var routeParams;
  var mockAdminData;
  var mockModalInstance;
  var GoalFormCtrl;
  var $httpBackend;
  var mockSetGoal;
  var mockClose;
  var mockDismiss;
  var modalInstance;
  var createGoal;
  var updateGoal;

  beforeEach(angular.mock.inject(function($rootScope, $controller, $routeParams, _$httpBackend_, _$uibModal_) {
    scope = $rootScope.$new();
    createGoal = sinon.spy();
    updateGoal = sinon.spy();

    $ControllerConstructor = $controller;
    routeParams = $routeParams;
    mockSetGoal = sinon.spy();
    mockClose = sinon.spy();
    mockDismiss = sinon.spy();
    modalInstance = {
      close: mockClose,
      dismiss: mockDismiss
    }
    scope.goalForm = {};
    scope.params = {};
    mockAdminData = {
      Standards: {
        setGoal: mockSetGoal,
        getGoal: function() {},
        createGoal: function() {},
        updateGoal: function() {}
      }
    };
    $httpBackend = _$httpBackend_;
    GoalFormCtrl = $ControllerConstructor('GoalCtrl', {
      $scope: scope,
      $routeParams: routeParams,
      AdminData: mockAdminData,
      $uibModalInstance: modalInstance
    });
  }));

  it ('Should be able to create a new controller', function() {
    expect(typeof GoalFormCtrl).to.equal('object');
  });
  describe('save', function() {
    beforeEach(function() {
    });
    it('should exist and be a function', function() {
      expect(typeof scope.save).to.equal('function');
    });
    it('should call the modalInstance close function', function() {
      scope.params.formType = 'creating';
      scope.goalForm.$valid = true;
      expect(mockClose.called).to.equal(false);
      scope.save();
      expect(mockClose.called).to.equal(true);
    });
    // it('should call createGoal() if the formType is set to creating', function() {
    //   console.warn(scope.exposed.init);
    //   scope.params.formType = 'creating';
    //   scope.goalForm.$valid = true;
    //   expect(createGoal.called).to.equal(false);
    //   scope.save();
    //   expect(createGoal.called).to.equal(true);
    // });
    // it('should call updateGoal() if the formType is set to editing', function() {
    //   scope.params.formType = 'editing';
    //   expect(updateGoal.called).to.equal(false);
    //   scope.save();
    //   expect(updateGoal.called).to.equal(true);
    // });
  });
  describe('cancel', function() {
    it('should be a function', function() {
      expect(typeof scope.cancel).to.equal('function');
    });
    it('should call the modalInstance dimiss function', function() {
      expect(mockDismiss.called).to.equal(false);
      scope.cancel();
      expect(mockDismiss.called).to.equal(true);
      expect(typeof mockDismiss.calledWith).to.equal('function');
    });
  });
});
