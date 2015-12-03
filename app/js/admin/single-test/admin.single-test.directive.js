'use strict';
function pcSingleTest() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/js/admin/single-test/single-test.html',
        controller: 'SingleTestCtrl',
        controllerAs: 'st'
    };
}
module.exports = function (app) {
    app.directive('pcSingleTest', pcSingleTest);
};
