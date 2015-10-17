/**
 * A controller for dealing with the reset password modal
 * Created by Jonathan Ullberg on 10/16/2015
 */
'use strict';

module.exports = function(app) {
  app.controller('ForgotPasswordCtrl', ['$scope', '$modal', '$modalInstance', '$http', 'Errors', function($scope, $modal, $modalInstance, $http, Errors) {
    $scope.submitForm = function() {
      $http.post('/api/forgot', $scope.resetPassword)
        .then(function(data) {
          $modalInstance.close();
          $modal.open({
            animation:true,
            size:'lg',
            templateUrl:'/templates/auth/forgot_thanks.html'
          });
        }, function(err) {
          return Errors.addError({
            'msg': 'There was an error on the server. Please try again in a bit. If the problem continues, please submit a bug report. Thank you for your patience.'
          });
        });
    }
  }]);
};
