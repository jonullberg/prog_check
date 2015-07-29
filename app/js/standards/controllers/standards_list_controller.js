'use strict';

module.exports = function(app) {
  app.controller('StandardsListCtrl', ['$scope', '$modal', '$rootScope', 'Errors', 'Standards', function($scope, $modal, $rootScope, Errors, Standards) {
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
      $modal.open({
        animation:true,
        templateUrl: '/templates/directives/standards/standard_form.html',
        size: 'lg',
        controller: 'StandardFormCtrl',
        scope: scope
      });
    };

    $scope.select = function(standard) {
      Standards.setStandard(standard);
      $scope.show();
    };
  }]);
};
