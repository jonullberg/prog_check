'use strict';

module.exports = function(app) {
  app.controller('headerController', ['$scope', 'UserService', function($scope, auth) {

    $scope.changeView = function(url) {

    };
  }]);
};
