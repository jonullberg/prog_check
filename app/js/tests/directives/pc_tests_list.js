'use strict';

module.exports = function(app) {
  app.directive('pcTestsList', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/tests_list.html',
      scope: {
        tests: '=',
        test: '=',
        standard: '=',
        toggleSingleTest: '&',
        toggleTestForm: '&'
      },
      controller: 'testCtrl'
    };
  });
};
