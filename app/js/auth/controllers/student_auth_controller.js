'use strict';

module.exports = function(app) {
  app.controller('StudentAuthCtrl', ['$scope', '$cookies', '$location', 'StudentAuthService', 'Errors', function($scope, $cookies, $location, StudentAuth, Errors) {
    $scope.authSubmit = function(student) {
      StudentAuth.signIn(student, function(err) {
        if (err) {
          console.log(err);
        }
        var user = $cookies.getObject('user')
        $location.path('/students/home');
      });
    };

  }]);
};
