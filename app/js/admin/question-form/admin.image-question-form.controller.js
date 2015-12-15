var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('ImageQuestionFormCtrl', ['$scope', '$uibModalInstance', '$sce', '$http', '$routeParams', 'AdminData', 'Upload', imageQuestionFormCtrl]);
    function imageQuestionFormCtrl($scope, $uibModalInstance, $sce, $http, $routeParams, AdminData, Upload) {
        $scope.trustAsHtml = $sce.trustAsHtml;
        $scope.$on('test:changed', getTest);
        $scope.$watch('questionImage', function (file) {
            upload(file, function (filePath) {
                $scope.question.question = process.env.AWS_GET_URL + filePath;
            });
        });
        $scope.$watch('correctImage', function (file) {
            upload(file, function (filePath) {
                $scope.question.correct = process.env.AWS_GET_URL + filePath;
                $scope.question.answers[0] = process.env.AWS_GET_URL + filePath;
            });
        });
        $scope.$watch('answersImage1', function (file) {
            upload(file, function (filePath) {
                $scope.question.answers[1] = process.env.AWS_GET_URL + filePath;
            });
        });
        $scope.$watch('answersImage2', function (file) {
            upload(file, function (filePath) {
                $scope.question.answers[2] = process.env.AWS_GET_URL + filePath;
            });
        });
        $scope.$watch('answersImage3', function (file) {
            upload(file, function (filePath) {
                $scope.question.answers[3] = process.env.AWS_GET_URL + filePath;
            });
        });
        $scope.init = function () {
            getTest();
            getQuestion();
        };
        $scope.save = function (question) {
            if ($scope.params.formType === 'creating') {
                question.answers = Object.keys(question.answers)
                    .map(function (key) {
                    return question.answers[key];
                });
                createQuestion(question);
            }
            else if ($scope.params.formType === 'editing') {
                updateQuestion(question);
            }
            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
        function upload(file, cb) {
            var storeAuth = $http.defaults.headers.common.Authorization;
            delete $http.defaults.headers.common.Authorization;
            if (file && file.name) {
                var filename = Math.round(Math.random() * 10000) + file.name;
                Upload.upload({
                    url: process.env.AWS_URL,
                    method: 'POST',
                    data: {
                        'key': filename,
                        'acl': 'public-read',
                        'Content-Type': file.type,
                        'AWSAccessKeyId': process.env.AWS_ACCESS_KEY,
                        'Policy': process.env.AWS_POLICY,
                        'Signature': process.env.AWS_SIGNATURE,
                        'filename': filename
                    },
                    'file': file
                })
                    .then(function (response) {
                    cb(filename);
                });
                $http.defaults.headers.common.Authorization = storeAuth;
            }
        }
        ;
        function getQuestion() {
            if ($scope.params.formType === 'creating') {
                $scope.question = {
                    question: null,
                    correct: null,
                    answers: [null, null, null]
                };
            }
            else {
                $scope.question = AdminData.Tests.getQuestion();
            }
        }
        function getTest() {
            $scope.test = AdminData.Tests.getTest();
        }
        function createQuestion(question) {
            AdminData.Tests.createQuestion($scope.test._id, question);
        }
        function updateQuestion(question) {
            AdminData.Tests.updateQuestion($routeParams.testId, question);
        }
    }
})(ProgCheck || (ProgCheck = {}));
