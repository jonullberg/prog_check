'use strict';
module.exports = function (app) {
    app.directive('pcTestForm', pcTestForm);
    function pcTestForm() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/admin/test-form/test-form.html',
            scope: {
                buttonText: '='
            },
            controller: 'TestFormCtrl',
            controllerAs: 'tf'
        };
    }
};
