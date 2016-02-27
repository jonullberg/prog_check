/**
 * The controller for the tests list
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/30/2015
 */
 /// <reference path="../../../../tools/typings/tsd.d.ts" />
module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('TestsListCtrl', ['$scope', '$uibModal', '$rootScope', '$location', '$routeParams', 'AdminData', testsListCtrl]);

  function testsListCtrl($scope, $uibModal: ng.ui.bootstrap.IModalService, $rootScope, $location: ng.ILocationService, $routeParams, AdminData) {
    var tl = this;
    $scope.$on('standard:changed', getStandard);
    $scope.$on('tests:changed', getTests);

    // Public Functions
    tl.init = function() {
      fetchTests()
      getStandard();
      getTests();
    };
    tl.select = function(test) {
      AdminData.Tests.setTest(test);
      $location.path('/admin/standards/' + $routeParams.standardId + '/tests/' + test._id);
    };
    tl.newTest = function() {
      AdminData.Tests.setTest(null);
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'creating',
        buttonText: 'Create Test'
      };
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/admin/test-form.html',
        size: 'lg',
        controller: 'TestFormCtrl',
        controllerAs: 'tf',
        scope: scope
      });
    };

    // Private Functions
    function getStandard() {
      var standard = AdminData.Standards.getStandard();
      if (!AdminData.Standards.getStandard()) {
        AdminData.Standards.fetchStandard($routeParams.standardId);
      }
      tl.standard = AdminData.Standards.getStandard();
    }
    function getTests() {
      tl.tests = numberTests(AdminData.Tests.getTests());
    }
    function fetchTests() {
      if (!AdminData.Tests.getTests()) {
        AdminData.Tests.fetchTests($routeParams.standardId);
      }
    }
    function fetchTests() {
      AdminData.Tests.fetchTests($routeParams.standardId, function(err, data) {
        tl.tests = numberTests(data.tests)
      });
    }
    function numberTests(tests) {
      if (tests && tests.length) {
        tests.forEach(function(test, i) {
          test.testName = 'Test #' + (i + 1);
        });
        return tests;
      }
    }
  }
}
