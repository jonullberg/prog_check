'use strict';

module.exports = function(app) {
  app.controller('StandardsListCtrl', ['$scope', '$uibMmodal', '$rootScope', '$cookies', '$location', 'Errors', 'AdminData', function($scope, $modal, $rootScope, $cookies, $location, Errors, AdminData) {
    $scope.$on('standards:changed', function(e, standards) {
      $scope.standards = standards;
    });

    $scope.getStandards = getStandards;

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
      $location.path('/admin/standards/' + standard._id)
      return $scope.show();
    };

    function updateStandards() {
      $scope.standards = AdminData.Standards.getStandards();
    }
    function getStandards() {
      var standards = AdminData.Standards.getStandards();
      if (standards && standards.length) {
        updateStandards();
      } else {
        AdminData.Standards.fetchStandards(function(err, data) {
          updateStandards();
        });
      }
    }
  }]);
};
