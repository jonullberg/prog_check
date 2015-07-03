'use strict';

module.exports = function(app) {
  app.directive('pcSingleTest', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/single_test.html',
      scope: {
        test: '&'
      }
    };
  });
};
