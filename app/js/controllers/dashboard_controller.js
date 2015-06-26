'use strict';

module.exports = function(app) {
  app.controller('dashboardController', ['$scope', '$location', function($scope, $location) {

    $scope.visibleModule = 'standards';
    $scope.changeDashboardModule = function(moduleName) {
      $scope.visibleModule = moduleName;
    };
  }]);
};
