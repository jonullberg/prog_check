'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', function($scope) {

    /**
     * Holds title and template URL for directives
     * @type {Array}
     */
    $scope.tabs = [{
      title: 'Sign Up',
      url: '../templates/directives/sign_up.html'
    }, {
      title: 'Sign In',
      url: '../templates/directives/sign_in.html'
    }];

    $scope.currentTab = '../templates/directives/sign_up.html';

    $scope.onClickTab = function(tab) {
      $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function(tabUrl) {
      return tabUrl === $scope.currentTab;
    };

  }]);
};
