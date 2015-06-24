'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', function($scope) {

    $scope.tabs = [{
      title: 'Sign Up',
      url: '../templates/directives/sign_up.html'
    }, {
      title: 'Sign In',
      url: '../templates/directives/sign_in.html'
    }];

    $scope.currentTab = '../templates/directives/sign_in.html';
  }]);
};
