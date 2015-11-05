'use strict';

module.exports = function(app) {
  app.controller('StudentTestsCtrl', ['$scope', '$location', 'Errors', 'Student', function($scope, $location, Errors, Student) {
    $scope.student = Student.student;
    $scope.takeTest = function(goal) {
      var goalId = goal.goalId;
      Student.getTestByGoalId(goalId, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error getting your test'
          });
        }
        $location.path('/student/' + $scope.student._id + '/tests/' + data._id);
      });
    };
  }]);
};
