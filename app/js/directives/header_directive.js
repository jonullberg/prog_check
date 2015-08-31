'use strict';

module.exports = function(app) {
  app.directive('pcHeader', ['$location', '$cookies', function($location, $cookies) {
    var controller = ['$scope', 'AuthenticationService', function($scope, AuthenticationService) {
      $scope.tabs = [{
        header: 'Home',
        url: 'home'
      },
      {
        header: 'How It Works',
        url: 'about'
      },
      {
        header: 'Pricing',
        url: 'pricing'
      }];

      $scope.$watch(function() {
        return AuthenticationService.isLogged;
      }, function(newVal, oldVal, scope) {
        if (newVal) {
          if ($cookies.getObject('user').role === 'admin') {
            scope.tabs = [{
              header: 'Home',
              url: 'admin/home'
            },
            {
              header: 'Standards',
              url: 'admin/standards'
            },
            {
              header: 'Teachers',
              url: 'admin/teachers'
            }];
          } else if ($cookies.getObject('user').role === 'teacher') {
            scope.tabs = [{
              header: 'Home',
              url: 'teacher/home'
            },
            {
              header: 'Students',
              url: 'teacher/students'
            },
            // {
            //   header: 'Tests',
            //   url: 'teacher/tests'
            // }
            ];
          } else if ($cookies.getObject('user').role === 'student') {
            scope.tabs = [{
              header: 'Home',
              url: 'student/home'
            },
            {
              header: 'Tests',
              url: 'student/tests'
            },
            // {
            //   header: 'Scores',
            //   url: 'student/scores'
            // }
            ];
          }
        } else {
          scope.tabs = [{
            header: 'Home',
            url: 'home'
          },
          {
            header: 'About Us',
            url: 'about'
          },
          {
            header: 'Pricing',
            url: 'pricing'
          }];
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
