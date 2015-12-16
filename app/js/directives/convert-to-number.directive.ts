/**
 * A simple directive to convert values to an integer rather than a string
 */
module ProgCheck {

  'use strict';

  angular
    .module('progCheck')
    .directive('convertToNumber', convertToNumber)

  function convertToNumber() {
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
  }

}
