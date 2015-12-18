var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcSingleStandard', pcSingleStandard);
    function pcSingleStandard() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/admin/single-standard.html',
            controller: 'SingleStandardCtrl',
            controllerAs: 'ss'
        };
    }
})(ProgCheck || (ProgCheck = {}));
