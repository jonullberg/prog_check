/**
 * A Controller for the Admin Test Form
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 09/25/2015
 */
/// <reference path="../../../../tools/typings/tsd.d.ts" />
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('TestFormCtrl', ['$scope', '$routeParams', '$uibModalInstance', 'AdminData', testFormCtrl]);
    // export = function(app) {
    //   app.controller('TestFormCtrl', ['$scope', '$routeParams', '$uibModalInstance', 'AdminData', testFormCtrl]);
    function testFormCtrl($scope, $routeParams, $uibModalInstance, AdminData) {
        this.$on('test:changed', getTest);
        // Public Functions
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
        // Private Functions
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
    ;
})(ProgCheck || (ProgCheck = {}));
