'use strict';

module.exports = function(app) {
  app.directive('pcStandards', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/standards.html'
    };
  });
};
