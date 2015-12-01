'use strict';

module.exports = function(app) {
  app.controller('SingleStandardModalCtrl', ['$scope', '$uibModal', '$uibModalInstance', '$cookies', '$rootScope', '$sce', 'TeacherData', function($scope, $uibModal, $uibModalInstance, $cookies, $rootScope, $sce, TeacherData) {

    $scope.init = init;
    $scope.addGoal = addGoal;
    $scope.$on('standard:changed', getStandard);

    $scope.goBack = function() {
      $uibModalInstance.close();
      TeacherData.Standards.setStandard(null);
      $uibModal.open({
        animation:true,
        templateUrl:'/templates/directives/standards/standards_list.html',
        size:'lg',
        controller:'StandardsListModalCtrl'
      });
    };

    $scope.showExampleQuestion = showExample;
    $scope.showDescription = showDescription;

    function init() {
      getStandard();

    }

    function getStandard() {
      $scope.standard = TeacherData.Standards.getStandard();
    }

    function addGoal(goal) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Add Goal',
        formType: 'creating'
      };
      TeacherData.Students.setGoal(goal);
      scope.student = $scope.student;
      $uibModalInstance.close();
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/teacher/student_goal_settings.html',
        size:'lg',
        controller: 'StudentGoalSettingsCtrl',
        scope: scope
      });
    }

    function showExample(goal) {
      var showing = goal.enableExample;
      $scope.standard.goals.forEach(function(goal) {
        goal.enableExample = false;
      });
      goal.enableExample = !showing;
    }

    function showDescription(goal) {
      var showing = goal.descriptionShowing;
      $scope.standard.goals.forEach(function(goal) {
        goal.descriptionShowing = false;
      });
      goal.descriptionShowing = !showing;
    }
  }]);
};
