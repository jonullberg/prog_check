'use strict';

module.exports = function(app) {
  app.controller('TermsCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

    $scope.close = function() {
      $uibModalInstance.close();
    };

  }]);
};
