var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('TestFormCtrl', ['$scope', '$routeParams', '$uibModalInstance', 'AdminData', testFormCtrl]);
    function testFormCtrl($scope, $routeParams, $uibModalInstance, AdminData) {
        $scope.$on('test:changed', getTest);
        var tf = this;
        tf.init = function init() {
            getTest();
            getStandard();
        };
        tf.boolToString = function (arg) {
            return arg ? 'Yes' : 'No';
        };
        tf.cancel = function (test) {
            $uibModalInstance.dismiss();
        };
        tf.save = function (test) {
            test.standardId = $routeParams.standardId;
            if ($scope.params.formType === 'editing') {
                updateTest(test);
            }
            else if ($scope.params.formType === 'creating') {
                console.log('creating');
                createTest(test);
            }
            $uibModalInstance.close();
        };
        function getTest() {
            if ($scope.params.formType === 'editing') {
                if (!AdminData.Tests.getTest()) {
                    AdminData.Tests.fetchTest($routeParams.testId);
                }
                tf.test = AdminData.Tests.getTest();
                tf.test._goal = tf.test.goalId;
                return;
            }
            tf.test = AdminData.Tests.getTest();
            tf.test = AdminData.Tests.getTest();
            tf.test._goal = tf.test.goalId;
        }
        function getStandard() {
            tf.standard = AdminData.Standards.getStandard();
        }
        function updateTest(test) {
            AdminData.Tests.updateTest(test);
        }
        function createTest(test) {
            AdminData.Tests.createTest(test);
        }
    }
})(ProgCheck || (ProgCheck = {}));
