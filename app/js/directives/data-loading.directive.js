var ProgCheck;
(function (ProgCheck) {
    angular
        .module('progCheck')
        .directive('pcDataLoading', pcDataLoading);
    function pcDataLoading() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/directives/data-loading.tmpl.html',
            link: function (scope, iElement, iAttr) {
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
