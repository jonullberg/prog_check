'use strict';

module.exports = function(app) {
  app.directive('pcHeader', ['$location', '$cookies', function($location, $cookies) {
    var controller = ['$scope', 'AuthenticationService', function($scope, AuthService) {
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
        return AuthService.isLogged;
      }, function(newVal, oldVal, scope) {
        if (newVal) {
          var user = AuthService.user;
          if (user.role === 'admin') {
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
          } else if (user.role === 'teacher') {
            scope.tabs = [{
              header: 'Home',
              url: 'teacher/' + user._id + '/home'
            },
            {
              header: 'Students',
              url: 'teacher/' + user._id + '/students'
            },
            // {
            //   header: 'Tests',
            //   url: 'teacher/tests'
            // }
            ];
          } else if (user.role === 'student') {
            scope.tabs = [{
              header: 'Home',
              url: 'student/' + user._id + '/home'
            },
            {
              header: 'Tests',
              url: 'student/' + user._id + '/tests'
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
