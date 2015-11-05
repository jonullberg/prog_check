'use strict';

module.exports = function(app) {
  app.controller('StandardsListCtrl', ['$scope', '$uibModal', '$rootScope', '$cookies', 'Errors', 'Standards', function($scope, $uibModal, $rootScope, $cookies, Errors, Standards) {
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

    $scope.isAdmin = function() {
      if ($cookies.getObject('user').role === 'admin') {
        return true;
      }
      return false;
    };

    /**
     * Opens modal with ability to add a new standard
     */

    $scope.newStandard = function() {
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'creating',
        buttonText: 'Create Standard'
      };
      scope.showStandard = function() {
        $scope.show();
      };
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/directives/standards/standard_form.html',
        size: 'lg',
        controller: 'StandardFormCtrl',
        scope: scope
      });
    };

    $scope.select = function(standard) {
      Standards.setStandard(standard);
      return $scope.show();
    };
  }]);
};
