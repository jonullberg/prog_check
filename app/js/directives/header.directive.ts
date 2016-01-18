module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcHeader', ['$location', pcHeader])

  function pcHeader($location) {
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
        return AuthService.getUser();
      }, function(newVal, oldVal, scope) {
        if (newVal) {
          if (newVal.role === 'admin') {
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
          } else if (newVal.role === 'teacher') {
            scope.tabs = [{
              header: 'Home',
              url: 'teacher/' + newVal._id + '/home'
            },
            {
              header: 'Students',
              url: 'teacher/' + newVal._id + '/students'
            }
            ];
          } else if (newVal.role === 'student') {
            scope.tabs = [];
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
  }

}
