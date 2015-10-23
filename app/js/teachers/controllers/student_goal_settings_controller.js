/**
 * A controller to deal with the view that edits a single students selected goal
 */
'use strict';

module.exports = function(app) {
  app.controller('StudentGoalSettingsCtrl', ['$scope', '$modalInstance', '$routeParams', 'TeacherData', 'Errors', function ($scope, $modalInstance, $routeParams, TeacherData, Errors) {
    $scope.save = function(goal) {
      if ($scope.params.formType === 'editing') {
        updateGoal(goal);
      } else if ($scope.params.formType === 'creating') {
        createGoal(goal);
      }
      $modalInstance.close();
    };
    $scope.cancel = function() {
      $modalInstance.dismiss();
    };

    function updateGoal(goal) {
      TeacherData.Students.updateGoal(goal, $routeParams.studentId, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error updating that goal to the student. Plese refresh, log back in and try again. If the error persists, please file a report to the administrator through your profile.'
          });
        }
      });
    }

    function createGoal(goal) {
      TeacherData.Students.createGoal(goal, $routeParams.studentId, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error adding that goal to the student. Please refresh, log back in and try again. If the error continues, please file a report to the administrator through your profile.'
          });
        }
      });
    }
  }]);
};
