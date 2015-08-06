'use strict';

module.exports = function(app) {
  app.controller('TestFormCtrl', ['$scope', '$modalInstance', 'Tests', 'Standards', 'Errors', function($scope, $modalInstance, Tests, Standards, Errors) {

    $scope.standard = Standards.standard;
    $scope.test = Tests.test;
    $scope.setGoal = function(test) {
      if (!test) {
        test = {};
      }
      test._goal = test.goalId;
    };

    $scope.cancel = function(test) {
      $modalInstance.dismiss();
    };

    var saveTest = function(test) {
      Tests.saveTest(test, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error updating your test'
          });
        }
      });
    };

    var createTest = function(test) {
      Tests.createTest(test, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to create test'
          });
        }
      });
    }

    $scope.save = function(test) {
      if (!test.standardId && Standards.standard) {
        test.standardId = Standards.standard._id;
      }
      if ($scope.params.formType === 'editing') {
        saveTest(test);
      } else if ($scope.params.formType === 'creating') {
        createTest(test);
      }
      $modalInstance.close();
    };
  }]);
};
