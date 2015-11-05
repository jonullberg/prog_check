'use strict';

module.exports = function(app) {
  app.directive('pcSingleTest', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/admin/single_test.html',
      controller: 'SingleTestCtrl'
    };
  });
};
