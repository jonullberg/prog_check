'use strict';

module.exports = function(app) {
  app.controller('TestsListCtrl', ['$scope', '$modal', '$filter', '$rootScope', 'Errors', 'Tests', 'Standards',  function($scope, $modal, $filter, $rootScope, Errors, Tests, Standards) {

    $scope.standard = Standards.standard;

    var numberTests = function(tests) {
      for (var i = 0; i < tests.length; i++) {
        tests[i].testName = "Test #" + (i + 1);
      }

      return tests;
    };

    var updateTests = function() {
      $scope.tests = $filter('filter')(Tests.tests, {standardId: $scope.standard._id});
      $scope.tests = numberTests($scope.tests);
    };

    updateTests();
    $scope.$on('tests:changed', updateTests);

    /**
     * Will make a GET request to /api/tests and return an array of tests to be displayed
     */
    $scope.getAll = function() {
      Tests.getTests(function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'Error retrieving tests'
          });
        }
        updateTests();
      });
    };

    $scope.select = function(test) {
      Tests.setTest(test);
      $scope.toggleSingleTest();
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
  }]);
};
