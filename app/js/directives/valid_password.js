'use strict';

module.exports = function(app) {
  app.directive('validPwd', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, iElement, iAttrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          var containsLetter = containsLetter(viewValue);
          var containsDigit = containsDigit(viewValue);
          var hasCorrectLength = hasCorrectLength(viewValue);

          ctrl.$setValidity('containsLetter', containsLetter);
          ctrl.$setValidity('containsDigit', containsDigit);
          ctrl.$setValidity('hasCorrectLength', hasCorrectLength);

          if (containsLetter && containsDigit && hasCorrectLength) {
            return viewValue;
          } else {
            return undefined;
          }
        });
      }
    };
  });
};
