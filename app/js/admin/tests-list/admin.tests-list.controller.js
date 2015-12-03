'use strict';
module.exports = function (app) {
    app.controller('TestsListCtrl', ['$scope', '$uibModal', '$rootScope', '$location', '$routeParams', 'AdminData', function ($scope, $uibModal, $rootScope, $location, $routeParams, AdminData) {
            $scope.init = init;
            $scope.$on('standard:changed', getStandard);
            $scope.$on('tests:changed', function (e, data) {
                $scope.tests = data;
            });
            $scope.select = function (test) {
                AdminData.Tests.setTest(test);
                $location.path('/admin/standards/' + $scope.standard._id + '/tests/' + test._id);
            };
            $scope.newTest = function () {
                AdminData.Tests.setTest(null);
                var scope = $rootScope.$new();
                scope.params = {
                    formType: 'creating',
                    buttonText: 'Create Test'
                };
                $uibModal.open({
                    animation: true,
                    templateUrl: '/templates/directives/test_form.html',
                    size: 'lg',
                    controller: 'TestFormCtrl',
                    scope: scope
                });
            };
            function init() {
                getStandard();
                getTests();
            }
            function getStandard() {
                var standard = AdminData.Standards.getStandard();
                if (standard) {
                    $scope.standard = standard;
                }
                else {
                    AdminData.Standards.fetchStandard($routeParams.standardId, function (err, data) {
                        $scope.standard = data.standard;
                    });
                }
            }
            function getTests() {
                if (!AdminData.Tests.getTests()) {
                    AdminData.Tests.fetchTests($routeParams.standardId);
                }
                $scope.tests = numberTests(AdminData.Tests.getTests());
            }
            function numberTests(tests) {
                if (tests && tests.length) {
                    tests.forEach(function (test, i) {
                        test.testName = 'Test #' + (i + 1);
                    });
                    return tests;
                }
            }
        }]);
};
