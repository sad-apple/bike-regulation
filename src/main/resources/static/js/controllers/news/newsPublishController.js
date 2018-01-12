'use strict';
app.controller('newsPublishController', ["toaster", '$rootScope', '$scope', '$http', '$localStorage', function (toaster, $rootScope, $scope, $http, $localStorage) {

    $scope.news = {};
    $scope.news.content = '';
    $scope.files = {};
    var imgUrl = [];

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function (type, title, text) {
        toaster.pop(type, '', text);
    };

    function init() {
        $http.get("json/newsType.json").success(function (data) {
            $scope.newsTypes = data;
            $scope.newsType = data[data.length - 1];
        }).error(function (err) {
            alert(err.error);
        });
    }

    init();

    $scope.fileChanged = function (ele) {
        $scope.files = ele.files;
        $scope.$apply(); //传播Model的变化。
    }

    $scope.save = function () {
        var urls = '';
        for (var i in imgUrl) {
            if ($scope.news.content.indexOf(imgUrl[i]) != -1) {
                if (urls == '') {
                    urls = imgUrl[i];
                } else {
                    urls = urls + ',' + imgUrl[i];
                }
            }
        }

        $scope.news.imgUrls = urls == '' ? null : urls;
        $scope.news.newsType = $scope.newsType.id;
        $http.post('news', $scope.news).success(function (result) {
            if (result.status == 'SUCCESS') {
                $scope.pop('success', '', '发布成功');
                $scope.news = {};
                imgUrl = [];
                $scope.news.content = '';
                $scope.url = null;
            } else {
                $scope.pop('error', '', result.error);
            }
        }).error(function (err) {
            alert(err.error);
        });
    };

    $scope.upload = function () {
        var file = new FormData();
        file.append('file', $scope.file);
        $http.post('files/import-newsimage', file, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function (result) {
            if (result.status == 'SUCCESS') {
                $scope.pop('success', '', '发布成功');
                $scope.url = result.data.url;
                imgUrl.push($scope.url);
            } else {
                $scope.pop('error', '', result.error);
            }
        }).error(function (err) {
            alert(err.error);
        });
    };
}]);