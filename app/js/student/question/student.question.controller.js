var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('QuestionCtrl', ['$scope', '$sce', questionCtrl]);
    function questionCtrl($scope, $sce) {
        $scope.trustAsHtml = $sce.trustAsHtml;
        $scope.select = function (answer, $index) {
            $scope.question.selectedIndex = $index;
            $scope.selectAnswer({
                answer: answer
            });
        };
    }
})(ProgCheck || (ProgCheck = {}));
