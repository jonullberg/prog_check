module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('StandardsCtrl', ['$scope', '$filter', '$uibModal', '$rootScope', 'copy', 'AdminData', 'pcGrades', standardsCtrl])

  function standardsCtrl($scope, $filter, $uibModal, $rootScope, copy, AdminData, pcGrades) {

    $scope.formShowing = false;
    $scope.isStandardShowing = false;
    $scope.isStandardFormShowing = false;
    $scope.isTestShowing = false;
    $scope.isTestFormShowing = false;
    $scope.isAlertShown = false;

    /**
     * On event 'standard:changed' sets scope to model
     */
    $scope.$on('standard:changed', function() {
      $scope.standard = AdminData.Standards.getStandard();
    });


    $scope.addStandard = function() {
      $scope.isStandardFormShowing = !$scope.isStandardFormShowing;
    };

    $scope.toggleTestForm = function() {
      $scope.isTestFormShowing = !$scope.isTestFormShowing;
    };

    $scope.editStandard = function(standard) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Save Standard',
        standard: standard
      };
      $uibModal.open({
        animation:true,
        templateUrl:'/templates/directives/standard_form.html',
        size: 'lg',
        controller: 'StandardFormCtrl',
        scope: scope
      });
    };

    var toggleSingleStandard = function() {
      $scope.isStandardShowing = !$scope.isStandardShowing;
    };

    /**
     * Will set a standard to be displayed to the user
     * @param {Object} standard The specificed standard to be displayed
     */
    $scope.showStandard = function() {
      if (!$scope.isStandardShowing) {
        toggleSingleStandard();
      }
    };

    $scope.hideStandard = function() {
      if ($scope.isStandardShowing) {
        toggleSingleStandard();
      }
    };

    $scope.toggleSingleTest = function() {
      $scope.isTestShowing = !$scope.isTestShowing;
    };
  }
}
