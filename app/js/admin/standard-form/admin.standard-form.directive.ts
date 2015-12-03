'use strict';

export = function(app) {
  app.directive('pcStandardForm', pcStandardForm);
};
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