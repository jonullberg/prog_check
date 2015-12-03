'use strict';
module.exports = function (app) {
    app.controller('TestFormCtrl', ['$scope', '$routeParams', '$uibModalInstance', 'AdminData', testFormCtrl]);
    function testFormCtrl($scope, $routeParams, $uibModalInstance, AdminData) {
        this.$on('test:changed', getTest);
        this.init = function () {
            getTest();
            getStandard();
        };
        this.boolToString = function (arg) {
            return arg ? 'Yes' : 'No';
        };
        this.cancel = function (test) {
            $uibModalInstance.dismiss();
        };
        this.save = function (test) {
            test.standardId = $routeParams.standardId;
            if (this.params.formType === 'editing') {
                updateTest(test);
            }
            else if (this.params.formType === 'creating') {
                createTest(test);
            }
            $uibModalInstance.close();
        };
        function getTest() {
            if (this.params.formType === 'editing') {
                if (!AdminData.Tests.getTest()) {
                    AdminData.Tests.fetchTest($routeParams.testId);
                }
                this.test = AdminData.Tests.getTest();
                this.test._goal = this.test.goalId;
                return;
            }
            this.test = AdminData.Tests.getTest();
        }
        function getStandard() {
            this.standard = AdminData.Standards.getStandard();
        }
        function updateTest(test) {
            AdminData.Tests.updateTest(test);
        }
        function createTest(test) {
            AdminData.Tests.createTest(test);
        }
    }
};
