'use strict';

module.exports = function(app) {
  app.controller('SingleStandardCtrl', ['$scope', 'standard', function ($scope, standard, buttonText) {
    $scope.standard;
    $scope.buttonText;
    $scope.testFn = function() {
      console.log(buttonText);
      $scope.standard = standard;
      $scope.buttonText = buttonText;
    };
  }]);
};
