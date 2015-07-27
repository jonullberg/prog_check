'use strict';

module.exports = function(app) {
  app.controller('AddStudentGoalCtrl', ['$scope', function($scope) {
    $scope.show = function(standard) {
      var controller = ['$scope', '$modalInstance', function($scope, $modalInstance) {
        $scope.buttonText = 'Add This Standard';
        $scope.standard = standard.standard;
        $scope.toggle = function(standard) {
          dataStore.student.goals.push(standard.standard);
          $scope.student = dataStore.student;
          dataStore.saveStudent();
          $modalInstance.close();

        };
      }];
      $modal.open({
        animation: true,
        templateUrl: '/templates/directives/standards/single_standard.html',
        controller: controller,
        size: 'lg',
      });
      $modalInstance.close();
    };

  }]);
};
