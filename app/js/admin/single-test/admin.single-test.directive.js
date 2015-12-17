var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcSingleTest', pcSingleTest);
    function pcSingleTest() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/admin/single-test/single-test.html',
            controller: 'SingleTestCtrl',
            controllerAs: 'st'
        };
    }
})(ProgCheck || (ProgCheck = {}));
