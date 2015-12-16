module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('comparePassword', comparePassword)

  function comparePassword() {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, iElement, iAttrs, ctrl) {
        if (!ctrl) {return;}
        scope.$watch(iAttrs.ngModel, function() {
          validate();
        });

        iAttrs.$observe('comparePassword', function(val) {
          validate();
        });

        var validate = function() {
          var val1 = ctrl.$viewValue;
          var val2 = iAttrs.comparePassword;

          if (val1 === val2) {
            scope.pwdValidationWarnings.matches.className = '';
          } else {
            scope.pwdValidationWarnings.matches.className = 'red';
          }
          ctrl.$setValidity('comparePassword', ! val1 || ! val2 || val1 === val2);
        };
      }
    };
  }

}
