'use strict';

module.exports = function(app) {
  app.controller('StudentAuthCtrl', ['$scope', '$cookies', '$location', 'UserService', 'Errors', function($scope, $cookies, $location, UserService, Errors) {
    $scope.authSubmit = function(student) {
      UserService.studentSignIn(student, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error signing in'
          });
        }
        $location.path('/student/home');
      });
    };

  }]);
};
