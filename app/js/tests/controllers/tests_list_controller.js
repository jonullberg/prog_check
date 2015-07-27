'use strict';

module.exports = function(app) {
  app.controller('TestsListCtrl', ['$scope', '$modal', '$rootScope', 'Tests', 'dataStore', 'Errors',  function($scope, $modal, $rootScope, Tests, dataStore, Errors) {
    $scope.standard = dataStore.standard;
    $scope.tests = Tests.tests;
    var updateTests = function() {
      $scope.tests = Tests.tests;
    };
    $scope.$on('tests:changed', updateTests());
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
