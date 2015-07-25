'use strict';

module.exports = function(app) {
  app.directive('pcErrors', [function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/errors.html',
      controller: 'ErrorsCtrl'
    };
  }]);
};
