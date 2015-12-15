var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcTestsList', pcTestsList);
    function pcTestsList() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/admin/tests-list/tests-list.html',
            controller: 'TestsListCtrl',
            controllerAs: 'tl'
        };
    }
})(ProgCheck || (ProgCheck = {}));
