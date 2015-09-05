'use strict';

module.exports = function(app) {
  app.controller('StudentTestsCtrl', ['$scope', '$location', 'Errors', 'Student', function($scope, $location, Errors, Student) {
    $scope.student = Student.student;

    $scope.takeTest = function(goal) {
      Student.getTestByGoalId(goal, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error getting your test'
          });
        }
        $location.path('/student/tests/' + data[0]._id);
      });
    };
  }]);
};
