'use strict';

module.exports = function(app) {
  app.controller('mainController', ['$scope', '$location', 'AuthenticationService', function($scope, $location, AuthenticationService) {

    $scope.changeView = function(url) {
      $location.path(url);
    };
  }]);
};

