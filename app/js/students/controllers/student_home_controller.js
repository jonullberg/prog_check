'use strict';

module.exports = function(app) {
  app.controller('StudentHomeCtrl', ['$scope', '$cookies', 'Errors', function($scope, $cookies, Errors) {
    $scope.student = $cookies.getObject('user');
  }]);
};
