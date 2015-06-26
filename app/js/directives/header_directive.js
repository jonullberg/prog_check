'use strict';

module.exports = function(app) {
  app.directive('pcHeader', ['$location', function($location) {
    return {
      resrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/header.html',
      link: function(scope, el, attrs) {
      },
      controller: ['$scope', function($scope) {
        $scope.changeView = function(view) {
          $location.path(view);
        };
      }]
    };
  }]);
};
