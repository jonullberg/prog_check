module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('validPwd', validPwd)

  function validPwd() {
    return {
      restrict: 'A',
      require:'ngModel',
      link: function (scope, iElement, iAttrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          scope.pwdValidLength = (viewValue && viewValue.length >= 8 && viewValue.length <= 16 ? 'valid' : undefined);
          scope.pwdHasCapitalLetter = (viewValue && /[A-Z]/.test(viewValue)) ? 'valid' : undefined;
          scope.pwdHasLowerCaseLetter = (viewValue && /[a-z]/.test(viewValue)) ? 'valid' : undefined;
          scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

          if (scope.pwdValidLength && scope.pwdHasCapitalLetter && scope.pwdHasLowerCaseLetter && scope.pwdHasNumber) {
            scope.pwdValidationWarnings.capital.className = '';
            scope.pwdValidationWarnings.lower.className = '';
            scope.pwdValidationWarnings.number.className = '';
            scope.pwdValidationWarnings.length.className = '';
            ctrl.$setValidity('password', true);
            return viewValue;
          } else {
            if (!scope.pwdHasCapitalLetter){
              scope.pwdValidationWarnings.capital.className = 'red';
            } else {
              scope.pwdValidationWarnings.capital.className = '';
            }
            if (!scope.pwdHasLowerCaseLetter) {
              scope.pwdValidationWarnings.lower.className = 'red';
            } else {
              scope.pwdValidationWarnings.lower.className = '';
            }
            if (!scope.pwdHasNumber){
              scope.pwdValidationWarnings.number.className = 'red';
            } else {
              scope.pwdValidationWarnings.number.className = '';
            }
            if (!scope.pwdValidLength) {
              scope.pwdValidationWarnings.length.className = 'red';
            } else {
              scope.pwdValidationWarnings.length.className = '';
            }
            ctrl.$setValidity('password', false);
            return undefined;
          }
        });
      }
    };
  }
}
