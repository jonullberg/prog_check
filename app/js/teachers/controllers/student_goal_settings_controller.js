/**
 * A controller to deal with the view that edits a single students selected goal
 */
'use strict';

module.exports = function(app) {
  app.controller('StudentGoalSettingsCtrl', ['$scope', '$modalInstance', '$routeParams', 'TeacherData', function ($scope, $modalInstance, $routeParams, TeacherData) {
    console.log($scope.goal);
    $scope.save = function(goal) {
      if ($scope.params.formType === 'editing') {
        return updateGoal(goal);
      } else if ($scope.params.formType === 'creating') {
        createGoal(goal);
      }
    };
    $scope.cancel = function() {
      $modalInstance.dismiss();
    };
    function updateGoal(goal) {
      console.log('you are trying to update the goal');
      console.log(goal);
      // TODO: Make Update Goal call through data services
      TeacherData.Students.updateGoal(goal, $routeParams.studentId, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error updating that goal to the student. Plese refresh, log back in and try again. If the error persists, please file a report to the administrator through your profile.'
          });
        }
        $modalInstance.close();
      })
    }
    function createGoal(goal) {
      TeacherData.Students.createGoal(goal, $routeParams.studentId, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error adding that goal to the student. Please refresh, log back in and try again. If the error continues, please file a report to the administrator through your profile.'
          });
        }
        $modalInstance.close();
      });
    }
  }]);
};
