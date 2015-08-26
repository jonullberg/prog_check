'use strict';

module.exports = function(app) {
  app.controller('StudentTestsCtrl', ['$scope', 'Errors', 'Student', function($scope, Errors, Student) {
    $scope.student = Student.student;
    console.log($scope.student);

    $scope.takeTest = function(goal) {
      Student.getTestByGoalId(goal, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error getting your test'
          })
        }
        console.log(data);
      });
    };
  }]);
};
