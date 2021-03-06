var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcStandardsList', pcStandardsList);
    function pcStandardsList() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/admin/standards-list.html',
            controller: 'StandardsListCtrl',
            controllerAs: 'sl'
        };
    }
})(ProgCheck || (ProgCheck = {}));
