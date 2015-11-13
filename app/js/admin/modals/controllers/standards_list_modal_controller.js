'use strict';

module.exports = function(app) {
  app.controller('StandardsListModalCtrl', ['$scope', '$uibModal', '$uibModalInstance', '$rootScope', '$cookies', 'TeacherData', function($scope, $uibModal, $uibModalInstance, $rootScope, $cookies, TeacherData) {

    $scope.init = init;

    $scope.$on('standards:changed', getStandards);

    $scope.select = function(standard) {
      TeacherData.Standards.setStandard(standard);
      var scope = $rootScope.$new();
      scope.params = {
        goalButtonText: 'Add Goal'
      };
      $uibModalInstance.close();
      $uibModal.open({
        animation:true,
        templateUrl:'/templates/modals/single_standard_modal.html',
        size:'lg',
        controller:'SingleStandardModalCtrl',
        scope:scope
      });

    };
    function init() {
      getStandards();
    }
    function getStandards() {
      if (!TeacherData.Standards.getStandards()) {
        TeacherData.Standards.fetchStandards();
      }
      $scope.standards = TeacherData.Standards.getStandards();
    }

  }]);
};
