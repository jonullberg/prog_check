/**
 * A controller to deal with the view that edits a single students selected goal
 */
'use strict';

module.exports = function(app) {
  app.controller('StudentGoalSettingsCtrl', ['$scope', '$modalInstance', '$http', function ($scope, $modalInstance, $http) {
    console.log($scope);
    $scope.updateGoal = updateGoal;
    $scope.cancelUpdate = function() {
      $modalInstance.dismiss();
    };
    function updateGoal(goal) {
      var student = $scope.student;
      $http.put('/api/students/' + student._id + '/goals/' + goal._id, goal , function(err, data) {

      });
    }
  }]);
};
