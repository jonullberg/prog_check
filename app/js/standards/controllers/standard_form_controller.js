'use strict';

module.exports = function(app) {
  app.controller('StandardFormCtrl', ['$scope', '$modalInstance', 'dataStore', 'pcGrades', function($scope, $modalInstance, dataStore, pcGrades) {
    $scope.buttonText = $scope.params.buttonText;
    $scope.standard = $scope.params.standard;
    $scope.grades = angular.fromJson(pcGrades.grades);
    $scope.thisGrade = $scope.grades.filter(function(obj) {
      return obj.name === $scope.standard.gradeName;
    });

    $scope.changeGrade = function(grade) {
      $scope.thisGrade = $scope.grades.filter(function(obj) {
        return obj.name === grade;
      });
    };

    $scope.saveStandard = function(standard) {
      dataStore.updateStandard(standard, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to update this standard'
          });
        }
      });
      $modalInstance.close();
    };
  }]);
};
