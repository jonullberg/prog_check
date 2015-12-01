/**
 * A simple directive to convert values to an integer rather than a string
 */
'use strict';

module.exports = function(app) {
  app.directive('convertToNumber', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, iElement, iAttrs, ngModel) {
        ngModel.$parsers.push(function(val) {
          return parseInt(val, 10);
        });
        ngModel.$formatters.push(function(val) {
          return '' + val;
        });
      }
    };
  });
};
