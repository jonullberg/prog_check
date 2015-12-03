'use strict';
function pcTestsList() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/js/admin/tests-list/tests-list.html',
        controller: 'TestsListCtrl'
    };
}
module.exports = function (app) {
    app.directive('pcTestsList', pcTestsList);
};
