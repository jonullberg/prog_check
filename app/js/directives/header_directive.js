'use strict';

module.exports = function(app) {
  app.directive('pcHeader', ['$location', function($location) {
    var controller = ['$scope', 'auth', function($scope, auth) {
      $scope.tabs;

      $scope.getHeaders = function() {
        console.log($scope.tabs);
        if (auth.isSignedIn()) {
          console.log('signed in');
          $scope.tabs = [{
            header: 'Standards',
            url: 'standards'
          },
          {
            header: 'Teachers',
            url: 'teachers'
          }];
        } else {
          $scope.tabs = [{
            header: 'About Us',
            url: 'about'
          },
          {
            header: 'Pricing',
            url: 'pricing'
          }];
        }
      };

      $scope.changeView = function(url) {
        console.log(url);
        $location.path(url);
      };

    }];
    return {
      resrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/header.html',
      scope: {

      },
      controller: controller
    };
  }]);
};
