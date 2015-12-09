'use strict';

module.exports = function(app) {
  app.controller('StudentHomeCtrl', ['$scope', '$cookies', 'StudentData', function($scope, $cookies, StudentData) {
    $scope.student = StudentData.getUser();
  }]);
};
