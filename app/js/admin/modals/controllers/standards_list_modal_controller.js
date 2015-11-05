'use strict';

module.exports = function(app) {
  app.controller('StandardsListModalCtrl', ['$scope', '$uibModal', '$modalInstance', '$rootScope', '$cookies', 'Errors', 'Standards', 'Students', function($scope, $uibModal, $modalInstance, $rootScope, $cookies, Errors, Standards, Students) {
    $scope.standards;
    var updateStandards = function() {
      $scope.standards = Standards.standards;
    };
    $scope.$on('standards:changed', updateStandards());

    $scope.getAllStandards = function() {
      if (Standards.standards.length) {
        updateStandards();
      } else {
        Standards.getStandards(function(err, data) {
          if (err) {
            Errors.addError({
              'msg': 'Failed to get any standards'
            });
          }
          updateStandards();
        });
      }
    };

    $scope.select = function(standard) {
      Standards.setStandard(standard);
      var scope = $rootScope.$new();
      scope.params = {
        goalButtonText: 'Add Goal'
      };
      $modalInstance.close();
      $uibModal.open({
        animation:true,
        templateUrl:'/templates/modals/single_standard_modal.html',
        size:'lg',
        controller:'SingleStandardModalCtrl',
        scope:scope
      });

    };
  }]);
};
