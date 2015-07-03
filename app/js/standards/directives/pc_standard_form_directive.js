'use strict';

module.exports = function(app) {
  app.directive('pcStandardForm', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/standard_form.html',
      scope: {
        save: '&',
        standard: '=',
        addStandard: '&',
        toggle: '&',
        buttonText: '='
      }
    };
  });
};
