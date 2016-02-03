/**
 * For use in the Prog Check testing application
 * A controller for the Standard Form for the admin
 * Created by Jonathan Ullberg on 10/27/2015
 */
 /// <reference path="../../../../tools/typings/tsd.d.ts" />

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('StandardFormCtrl', ['$scope', '$uibModalInstance', '$location', '$routeParams', 'AdminData', 'grades', 'copy', standardFormCtrl]);

  function standardFormCtrl($scope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $location: ng.ILocationService, $routeParams, AdminData, grades, copy) {
    var sf = this;
    var master;
    $scope.$on('standard:changed', getStandard);

    // Public Functions
    sf.init = function() {
      if ($scope.params.formType === 'editing') {
        getStandard();
        getGrade(sf.standard.gradeName);
        setGrade(sf.standard);
        master = copy(sf.standard);
      }
    };

    sf.grades = angular.fromJson(grades);
    sf.cancel = function() {
      AdminData.Standards.setStandard(master);
      $uibModalInstance.dismiss();
    };

    sf.changeGrade = function(standard) {
      standard.gradeName = standard._gradeName;
      standard.domain = null;
      getGrade(standard.gradeName);
    };

    sf.save = function(standard) {
      if ($scope.params.formType === 'creating') {
        if ($scope.standardForm.$valid) {
          standard.shortGrade = sf.thisGrade.shortName;
          standard.goals = [];
          createStandard(standard);
          $uibModalInstance.close();
        }
      } else if ($scope.params.formType === 'editing') {
        if ($scope.standardForm.$valid) {
          standard.shortGrade = sf.thisGrade.shortName;
          if (!standard.goals) {
            standard.goals = [];
          }
          updateStandard(standard);
          $uibModalInstance.close();
        }
      }
    };

    // Private Functions

    function getGrade(gradeName: String) {
      sf.thisGrade = sf.grades.filter(function(grade) {
        return grade.name === gradeName;
      })[0];
    }
    function getStandard () {
      sf.standard = AdminData.Standards.getStandard();
    }
    function fetchStandard() {
      if (!AdminData.Standards.getStandard() && $routeParams.standardId) {
        AdminData.Standards.fetchStandard($routeParams.standardId);
      }
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
      standard.domain = sf.standard._domain;
      AdminData.Standards.updateStandard(standard, function() {
        $location.path('/admin/standards/' + standard._id);
      });
    }

    function createStandard(standard, cb?) {
      AdminData.Standards.createStandard(standard, function(err, data) {
        $location.url('admin/standards/' + data.standard._id);
      });
    }
  }
}
