'use strict';
function pcStandardForm() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/directives/standards/standard_form.html',
        scope: {
            buttonText: '=',
            standard: '='
        }
    };
}
module.exports = function (app) {
    app.directive('pcStandardForm', pcStandardForm);
};
