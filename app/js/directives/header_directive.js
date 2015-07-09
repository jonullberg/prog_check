'use strict';

module.exports = function(app) {
  app.directive('pcHeader', ['$location', '$cookies', function($location, $cookies) {
    var controller = ['$scope', 'AuthenticationService', function($scope,AuthenticationService) {
      $scope.tabs = [
          {
            header: 'About Us',
            url: 'about'
          },
          {
            header: 'Pricing',
            url: 'pricing'
          }
        ];

      $scope.$watch(function() {
        return AuthenticationService.isLogged;
      }, function(newVal, oldVal, scope) {
        if (newVal === true) {
          if ($cookies.get('role') === 'admin') {
            scope.tabs = [
              {
                header: 'Standards',
                url: 'admin/standards'
              },
              {
                header: 'Teachers',
                url: 'admin/teachers'
              }
            ];
          }
          if ($cookies.get('role') === 'teacher') {
            scope.tabs = [
              {
                header: 'Students',
                url: 'teacher/students'
              },
              {
                header: 'Tests',
                url: 'teacher/tests'
              }
            ];
          }
        } else {
          scope.tabs = [
            {
              header: 'About Us',
              url: 'about'
            },
            {
              header: 'Pricing',
              url: 'pricing'
            }
          ];
        }
      });

    }];
    return {
      resrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/header.html',
      scope: {
        changeView: '&'
      },
      controller: controller
    };
  }]);
};
