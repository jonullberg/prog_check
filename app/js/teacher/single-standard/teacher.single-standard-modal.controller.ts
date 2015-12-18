module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('SingleStandardModalCtrl', ['$scope', '$uibModal', '$uibModalInstance', '$cookies', '$rootScope', '$sce', 'TeacherData', singleStandardModalCtrl])

  function singleStandardModalCtrl($scope, $uibModal, $uibModalInstance, $cookies, $rootScope, $sce, TeacherData) {
    $scope.$on('standard:changed', getStandard);

    var ss = this;

    // Public Functions
    ss.init = function() {
      console.log('init');
      getStandard();
    };

    ss.addGoal = function(goal) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Add Goal',
        formType: 'creating'
      };
      TeacherData.Students.setGoal(goal);
      scope.student = ss.student;
      $uibModalInstance.close();
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/teacher/student-goal-settings.html',
        size:'lg',
        controller: 'StudentGoalSettingsCtrl',
        controllerAs: 'sgs',
        scope: scope
      });
    };

    ss.goBack = function() {
      $uibModalInstance.close();
      TeacherData.Standards.setStandard(null);
      $uibModal.open({
        animation:true,
        templateUrl:'/templates/admin/standards-list.html',
        size:'lg',
        controller:'StandardsListModalCtrl',
        controllerAs: 'sl'
      });
    };

    ss.showExampleQuestion = function(goal) {
      var original = goal.enableExample;
      ss.standard.goals.forEach(function(goal) {
        goal.enableExample = false;
      });
      goal.enableExample = !original;
    };

    ss.showDescription = function(goal) {
      var original = goal.descriptionShowing;
      ss.standard.goals.forEach(function(goal) {
        goal.descriptionShowing = false;
      });
      goal.descriptionShowing = !original;
    };

    // Private Functions
    function getStandard() {
      ss.standard = TeacherData.Standards.getStandard();
    }
  }
}
