/**
 * The controller for the tests list
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/30/2015
 */
'use strict';

module.exports = function(app) {
  app.controller('TestsListCtrl', ['$scope', '$modal', '$rootScope', '$location', '$routeParams', 'AdminData',  function($scope, $modal, $rootScope, $location, $routeParams, AdminData) {
    $scope.init = init;
    $scope.$on('standard:changed', getStandard);
    $scope.$on('tests:changed', function(e, data) {
      $scope.tests = data;
    });
    $scope.select = function(test) {
      AdminData.Tests.setTest(test);
      $location.path('/admin/standards/' + $scope.standard._id + '/tests/' + test._id);
    };
    $scope.newTest = function() {
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'creating',
        buttonText: 'Create Test'
      };
      $modal.open({
        animation:true,
        templateUrl: '/templates/directives/test_form.html',
        size: 'lg',
        controller: 'TestFormCtrl',
        scope: scope
      });
    };

    function init() {
      getStandard();
      getTests();
    }

    function getStandard() {
      var standard = AdminData.Standards.getStandard();
      if (standard) {
        $scope.standard = standard;
      } else {
        AdminData.Standards.fetchStandard($routeParams.standardId, function(err, data) {
          $scope.standard = data.standard;
        });
      }
    }
    function getTests() {
      var tests = AdminData.Tests.getTests();
      if (tests) {
        $scope.tests = numberTests(tests);
      } else {
        AdminData.Tests.fetchTests($routeParams.standardId, function(err, data) {
          $scope.tests = numberTests(data.tests);
        })
      }
    }
    function numberTests(tests) {
      if (tests && tests.length) {
        tests.forEach(function(test, i) {
          test.testName = 'Test #' + (i + 1);
        })
        return tests;
      }
    }

  }]);
};
