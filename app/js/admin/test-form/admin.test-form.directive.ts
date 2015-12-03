/**
 * A Directive for the Test Form
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/20/2015
 */
'use strict';

export = function(app) {  
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
