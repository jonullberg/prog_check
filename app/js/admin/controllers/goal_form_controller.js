'use strict';

module.exports = function(app) {
  app.controller('GoalCtrl', ['$scope', '$modalInstance', 'Errors', 'Standards', function($scope, $modalInstance, Errors, Standards) {


    var updateStandard = function() {
      $scope.standard = Standards.standard;
    };

    updateStandard();

    $scope.$on('standard:changed', updateStandard());

    var addGoal = function(goal) {
      Standards.addGoal(goal, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error creating that goal'
          });
        }
      });
      $scope.goal = null;
    };

    var saveGoal = function(goal) {
      Standards.saveGoal(goal, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error updating that goal'
          });
        }
      });
    };

    $scope.save = function(goal) {
      if ($scope.goalForm.$valid) {
        if ($scope.params.formType === 'creating') {
          addGoal(goal);
          $modalInstance.close();
        } else if ($scope.params.formType === 'editing') {
          saveGoal(goal);
          $modalInstance.close();
        }

      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };
  }]);

};
