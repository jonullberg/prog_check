/**
 * A Directive for the Test Form
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/20/2015
 */
 /// <reference path="../../../../tools/typings/tsd.d.ts" />

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcTestForm', pcTestForm)

  function pcTestForm() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/admin/test-form.html',
      scope: {
        buttonText: '='
      },
      controller: 'TestFormCtrl',
      controllerAs: 'tf'
    };
  }

}
