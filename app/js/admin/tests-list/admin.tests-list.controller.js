var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('TestsListCtrl', ['$scope', '$uibModal', '$rootScope', '$location', '$routeParams', 'AdminData', testsListCtrl]);
    function testsListCtrl($scope, $uibModal, $rootScope, $location, $routeParams, AdminData) {
        var tl = this;
        $scope.$on('standard:changed', getStandard);
        $scope.$on('tests:changed', getTests);
        tl.init = function () {
            fetchTests();
            getStandard();
            getTests();
        };
        tl.select = function (test) {
            AdminData.Tests.setTest(test);
            $location.path('/admin/standards/' + $routeParams.standardId + '/tests/' + test._id);
        };
        tl.newTest = function () {
            AdminData.Tests.setTest(null);
            var scope = $rootScope.$new();
            scope.params = {
                formType: 'creating',
                buttonText: 'Create Test'
            };
            $uibModal.open({
                animation: true,
                templateUrl: '/templates/admin/test-form.html',
                size: 'lg',
                controller: 'TestFormCtrl',
                controllerAs: 'tf',
                scope: scope
            });
        };
        function getStandard() {
            var standard = AdminData.Standards.getStandard();
            if (!AdminData.Standards.getStandard()) {
                AdminData.Standards.fetchStandard($routeParams.standardId);
            }
            tl.standard = AdminData.Standards.getStandard();
        }
        function getTests() {
            tl.tests = numberTests(AdminData.Tests.getTests());
        }
        function fetchTests() {
            if (!AdminData.Tests.getTests()) {
                AdminData.Tests.fetchTests($routeParams.standardId);
            }
        }
        function fetchTests() {
            AdminData.Tests.fetchTests($routeParams.standardId, function (err, data) {
                tl.tests = numberTests(data.tests);
            });
        }
        function numberTests(tests) {
            if (tests && tests.length) {
                tests.forEach(function (test, i) {
                    test.testName = 'Test #' + (i + 1);
                });
                return tests;
            }
        }
    }
})(ProgCheck || (ProgCheck = {}));
