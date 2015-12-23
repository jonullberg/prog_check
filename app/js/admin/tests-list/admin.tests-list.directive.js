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
            templateUrl: '/templates/admin/tests-list.html',
            controller: 'TestsListCtrl',
            controllerAs: 'tl'
        };
    }
})(ProgCheck || (ProgCheck = {}));
