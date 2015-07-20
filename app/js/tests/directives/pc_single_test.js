'use strict';

module.exports = function(app) {
  app.directive('pcSingleTest', function() {
    var controller = ['$scope', function($scope) {
      $scope.isAlertShown = false;
      $scope.toggleAlert = function() {
        if ($scope.isAlertShown) {
          $scope.isAlertShown = false;
        } else {
          $scope.isAlertShown = true;
        }
      };
    }];
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/single_test.html',
      scope: {
        toggleSingleTest: '&',
        toggleTestForm: '&',
        isTestShowing: '=',
        isTestFormShowing: '='
      },
      controller: 'testCtrl'
    };
  });
};
