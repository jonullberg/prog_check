/**
 * A Controller for the Admin Test Form
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 09/25/2015
 */
 /// <reference path="../../../../tools/typings/tsd.d.ts" />

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('TestFormCtrl', ['$scope', '$routeParams', '$uibModalInstance', 'AdminData', testFormCtrl])

  function testFormCtrl($scope, $routeParams, $uibModalInstance, AdminData) {

    $scope.$on('test:changed', getTest);

    // Public Functions
    var tf = this;
    tf.init = function() {
      getTest();
      getStandard();
    };

    tf.boolToString = function(arg) {
      return arg ? 'Yes' : 'No';
    };
    tf.cancel = function(test) {
      $uibModalInstance.dismiss();
    };
    tf.save = function(test) {
      test.standardId = $routeParams.standardId;
      if ($scope.params.formType === 'editing') {
        updateTest(test);
      } else if ($scope.params.formType === 'creating') {
        console.log('creating');
        createTest(test);
      }
      $uibModalInstance.close();
    };

    // Private Functions
    function getTest() {
      if ($scope.params.formType === 'editing') {
        if (!AdminData.Tests.getTest()) {
          AdminData.Tests.fetchTest($routeParams.testId);
        }
        tf.test = AdminData.Tests.getTest();
        tf.test._goal = tf.test.goalId;
        return;
      }
      tf.test = AdminData.Tests.getTest();
    }
    function getStandard() {
      tf.standard = AdminData.Standards.getStandard();
    }
    function updateTest(test) {
      AdminData.Tests.updateTest(test);
    }

    function createTest(test) {
      AdminData.Tests.createTest(test);
    }
  }

}
