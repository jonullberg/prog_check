'use strict';

module.exports = function(app) {
  app.directive('pcAccountTools', function() {
    var controller = ['$scope', '$cookies', '$location', 'UserService', function($scope, $cookies, $location, UserService) {


    }];
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/account_tools.html',
      scope: {
        getHeaders: '&'
      },
      controller: 'AccountToolsCtrl'

    };
  });


};
