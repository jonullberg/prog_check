'use strict';

module.exports = function(app) {
  app.directive('pcCreateStandard', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/create_standard.html'
    };
  });
};
