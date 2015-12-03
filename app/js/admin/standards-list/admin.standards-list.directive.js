'use strict';
function pcStandardsList() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/js/admin/standards-list/standards-list.html',
        controller: 'StandardsListCtrl',
        controllerAs: 'sl'
    };
}
module.exports = function (app) {
    app.directive('pcStandardsList', pcStandardsList);
};
