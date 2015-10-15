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
          var user = $cookies.getObject('user');
          if (user.role === 'admin') {
            scope.tabs = [{
              header: 'Home',
              url: 'admin/' + user._id + '/home'
            },
            {
              header: 'Standards',
              url: 'admin/' + user._id + '/standards'
            },
            {
              header: 'Teachers',
              url: 'admin/' + user._id + '/teachers'
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
