'use strict';

module.exports = function(app) {
  app.controller('StandardsListCtrl', ['$scope', '$uibModal', '$rootScope', '$cookies', '$location', 'Errors', 'AdminData', function($scope, $uibModal, $rootScope, $cookies, $location, Errors, AdminData) {
    $scope.$on('standards:changed', getStandards);
    $scope.init = init;
    $scope.getStandards = getStandards;

    $scope.isAdmin = function() {
      if (AdminData.getUser().role === 'admin') {
        return true;
      }
      return false;
    };

    /**
     * Opens modal with ability to add a new standard
     */

    $scope.newStandardModal = function() {
      var scope = $rootScope.$new();
      AdminData.Standards.setStandard(null);
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
      AdminData.Standards.setStandard(standard);
      $location.path('/admin/standards/' + standard._id);
      return $scope.show();
    };
    function init() {
      getStandards();
    }
    function getStandards() {
      if (!AdminData.Standards.getStandards()) {
        AdminData.Standards.fetchStandards();
      }
      $scope.standards = AdminData.Standards.getStandards();
    }
  }]);
};
