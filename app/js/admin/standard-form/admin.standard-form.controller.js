'use strict';
function standardFormCtrl($scope, $uibModalInstance, $location, $routeParams, AdminData, pcGrades, copy) {
    var sf = this;
    var master;
    $scope.$on('standard:changed');
    sf.init = function () {
        if ($scope.params.formType === 'editing') {
            getStandard();
            getGrade();
            setGrade(sf.standard);
            master = copy(sf.standard);
        }
    };
    sf.grades = angular.fromJson(pcGrades.grades);
    sf.cancel = function () {
        AdminData.Standards.setStandard(master);
        $uibModalInstance.dismiss();
    };
    sf.changeGrade = function (standard) {
        standard.gradeName = standard._gradeName;
        standard.domain = null;
        getGrade();
    };
    sf.save = function (standard) {
        if ($scope.params.formType === 'creating') {
            if (sf.standardForm.$valid) {
                standard.shortGrade = sf.thisGrade.shortName;
                standard.goals = [];
                createStandard(standard);
                $uibModalInstance.close();
            }
        }
        else if ($scope.params.formType === 'editing') {
            if ($scope.standardForm.$valid) {
                standard.shortGrade = sf.thisGrade.shortName;
                if (!standard.goals) {
                    standard.goals = [];
                }
                updateStandard(standard);
                $uibModalInstance.close();
            }
        }
    };
    function getGrade() {
        sf.thisGrade = sf.grades.filter(function (obj) {
            return obj.name === sf.standard.gradeName;
        })[0];
    }
    function getStandard() {
        sf.standard = AdminData.Standards.getStandard();
    }
    function setGrade(standard) {
        if (standard) {
            standard._gradeName = standard.gradeName;
            if (Array.isArray(standard.domain)) {
                standard._domain = standard.domain[0];
            }
            else {
                standard._domain = standard.domain;
            }
        }
    }
    function updateStandard(standard) {
        standard.domain = sf.standard._domain;
        AdminData.Standards.updateStandard(standard, function () {
            $location.path('/admin/standards/' + standard._id);
        });
    }
    function createStandard(standard, cb) {
        AdminData.Standards.createStandard(standard, function (err, data) {
            $location.url('admin/standards/' + data.standard._id);
        });
    }
}
module.exports = function (app) {
    app.controller('StandardFormCtrl', ['$scope', '$uibModalInstance', '$location', '$routeParams', 'AdminData', 'pcGrades', 'copy', standardFormCtrl]);
};
