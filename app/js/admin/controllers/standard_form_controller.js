/**
 * For use in the Prog Check testing application
 * A controller for the Standard Form for the admin
 * Created by Jonathan Ullberg on 10/27/2015
 */
'use strict';

module.exports = function(app) {
  app.controller('StandardFormCtrl', ['$scope', '$modalInstance', '$location', '$routeParams', 'AdminData', 'pcGrades', 'copy', function($scope, $modalInstance, $location, $routeParams, AdminData, pcGrades, copy) {
    var master;
    $scope.grades = angular.fromJson(pcGrades.grades);
    $scope.cancel = function() {
      AdminData.Standards.setStandard(master);
      $modalInstance.dismiss();
    };

    $scope.changeGrade = function(standard) {
      standard.gradeName = standard._gradeName;
      standard.domain = null;
      getGrade();
    };


    $scope.save = function(standard) {
      if ($scope.params.formType === 'creating') {
        if ($scope.standardForm.$valid) {
          standard.shortGrade = $scope.thisGrade.shortName;
          standard.goals = [];
          createStandard(standard);
          $modalInstance.close();
        }
      } else if ($scope.params.formType === 'editing') {
        if ($scope.standardForm.$valid) {
          standard.shortGrade = $scope.thisGrade.shortName;
          if (!standard.goals) {
            standard.goals = [];
          }
          updateStandard(standard);
          $modalInstance.close();

        }
      }
    };
    $scope.init = initForm;

    function initForm() {
      getStandard();
      getGrade();
      setGrade($scope.standard);
      master = copy($scope.standard);
    }
    function getGrade() {
      if ($scope.standard) {
        $scope.thisGrade = $scope.grades.filter(function(obj) {
          return obj.name === $scope.standard.gradeName;
        })[0];
      }
    }
    function getStandard () {
      $scope.standard = AdminData.Standards.getStandard();
    }
    function setGrade(standard) {
      if (standard) {
        standard._gradeName = standard.gradeName;
        if (Array.isArray(standard.domain)) {
          standard._domain = standard.domain[0];
        } else {
          standard._domain = standard.domain;
        }
      }
    }

    function updateStandard(standard) {
      standard.domain = $scope.standard._domain;
      AdminData.Standards.updateStandard(standard, function() {
        $location.path('/admin/standards/' + standard._id);
      });
    }

    function createStandard(standard, cb) {
      AdminData.Standards.createStandard(standard, function(err, data) {
        $location.url('admin/standards/' + data._id);
      });
    }
  }]);
};
