'use strict';

module.exports = function(app) {
  app.controller('StandardFormCtrl', ['$scope', '$modalInstance', 'Errors', 'Standards', 'pcGrades', function($scope, $modalInstance, Errors, Standards, pcGrades) {
    $scope.standard = Standards.standard;
    $scope.grades = angular.fromJson(pcGrades.grades);

    var getGrade = function() {
      if ($scope.standard) {
        $scope.thisGrade = $scope.grades.filter(function(obj) {
          return obj.name === $scope.standard.gradeName;
        });
      }
    };

    $scope.setGrade = function(standard) {
      if (standard) {
        standard._gradeName = standard.gradeName;
      }
    };

    getGrade();
    $scope.changeGrade = function(standard) {
      $scope.thisGrade = $scope.grades.filter(function(obj) {
        if (obj.name === standard._gradeName) {
          return obj;
        }
      });
      standard.gradeName = standard._gradeName;
      standard.domain = null;
    };

    var saveStandard = function(standard) {
      Standards.updateStandard(standard, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to update this standard'
          });
        }
      });
    };

    var createStandard = function(standard) {
      Standards.addStandard(standard, function(err, data) {
        if (err) {
          Errors.addError({
            'msg': 'Failed to create standard'
          });
        }
        Standards.standard = data;
      });
  };

    $scope.save = function(standard) {
      if ($scope.params.formType === 'creating') {
        if ($scope.standardForm.$valid) {
          standard.shortGrade = $scope.thisGrade[0].shortName;
          standard.goals = [];
          createStandard(standard);
          $modalInstance.close(function() {
            $scope.showStandard();
          });
        }
      } else if ($scope.params.formType === 'editing') {
        if ($scope.standardForm.$valid) {
          standard.shortGrade = $scope.thisGrade[0].shortName;
          if (!standard.goals) {
            standard.goals = [];
          }
          saveStandard(standard);
          $modalInstance.close();

        }
      }
    };
  }]);
};
