'use strict';

module.exports = function(app) {
  app.directive('pcSingleStandard', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/standards/single_standard.html',
      scope: {
        standard: '=',
        edit: '&',
        goBack: '&'
      }
    };
  });
};
