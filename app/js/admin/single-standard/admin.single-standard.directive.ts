module ProgCheck {
 'use strict';

 angular
   .module('progCheck')
   .directive('pcSingleStandard', pcSingleStandard)

 // export = function(app) {
 //   app.directive('pcSingleStandard', pcSingleStandard);
 // };

  function pcSingleStandard() {
   return {
     restrict: 'E',
     replace: true,
     templateUrl: '/js/admin/single-standard/single-standard.html',
     controller: 'SingleStandardCtrl',
     controllerAs: 'ss'
   };
  }
}
