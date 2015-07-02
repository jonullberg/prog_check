'use strict';

module.exports = function(app) {
  app.controller('testController', ['$scope', 'RESTResource', 'dataStore', function($scope, resource, dataStore) {

    var Test = resource('tests');

    $scope.tests = [];

    $scope.errors = [];

    $scope.displayedTest = null;

    $scope.getAll = function() {
      Test.getAll(function(err, data) {
        if (err) {
          return $scope.errors.push({
            'msg': 'Error retrieving tests'
          });
        }
        dataStore.tests = data;
        $scope.tests = data;

      });
    };

    $scope.addQuestion = function() {

    };

    $scope.saveQuestion = function(question) {

    };
  }]);
};
