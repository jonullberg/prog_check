'use strict';

module.exports = function(app) {
  app.controller('GoalCtrl', ['$scope', '$modalInstance', 'Errors', 'Standards', function($scope, $modalInstance, Errors, Standards) {

    var updateStandard = function() {
      $scope.standard = Standards.standard;
    };

    updateStandard();

    $scope.$on('standard:changed', updateStandard());

    $scope.save = function(goal) {
      Standards.addGoal(goal, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error creating that goal'
          });
        }
      });
      $scope.goal = null;
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };
  }]);

};
