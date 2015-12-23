var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('BugFormCtrl', ['$scope', '$rootScope', '$uibModal', '$uibModalInstance', 'RESTResource', 'Errors', bugFormCtrl]);
    function bugFormCtrl($scope, $rootScope, $uibModal, $uibModalInstance, resource, Errors) {
        var Bugs = resource('bugs');
        $scope.submitBug = function (bugReport) {
            if ($scope.bugForm.$valid) {
                Bugs.create(bugReport, function (err, data) {
                    if (err) {
                        Errors.addError({
                            'msg': 'There was an error creating the bug report'
                        });
                    }
                    $uibModalInstance.close();
                    var controller = ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                            $scope.dismiss = function () {
                                $uibModalInstance.dismiss();
                            };
                        }];
                    var scope = $rootScope.$new();
                    scope.params = {
                        header: 'Thanks for reporting',
                        message: 'We will make sure to take a look into the problem and fix it soon.'
                    };
                    $uibModal.open({
                        animation: true,
                        templateUrl: '/templates/modals/message.html',
                        size: 'lg',
                        controller: controller,
                        scope: scope
                    });
                });
            }
        };
        $scope.dismiss = function () {
            $uibModalInstance.dismiss();
        };
    }
})(ProgCheck || (ProgCheck = {}));
