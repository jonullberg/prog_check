'use strict';

module.exports = function(app) {
  app.controller('SingleStandardCtrl', ['$scope', 'dataStore', 'Errors', function ($scope, dataStore, Errors) {
    $scope.standard;

    var getStandard = function() {
      $scope.standard = dataStore.getStandard();
    };

    $scope.$on('standard:changed', getStandard());


    $scope.getStandard = function() {
      getStandard();
    };

    $scope.goBack = function() {
      dataStore.removeStandard();
      $scope.hideStandard();
    };

    $scope.deleteStandard = function(standard) {
      dataStore.removeStandard();
      dataStore.deleteStandard(standard, function(err) {
        if (err) {
          return Errors.addError({
          'msg': 'There was an error deleting this standard'
          });
        }
      });
      $scope.hideStandard();
    };

    // TODO: put this into alert directive
    $scope.toggleAlert = function() {
      if ($scope.isAlertShown) {
        $scope.isAlertShown = false;
      } else {
        $scope.isAlertShown = true;
      }
    };
  }]);
};
