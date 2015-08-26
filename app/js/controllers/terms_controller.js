'use strict';

module.exports = function(app) {
  app.controller('TermsCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {

    $scope.close = function() {
      $modalInstance.close();
    };

  }]);
};
