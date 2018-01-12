'use strict';
app.controller('newsModifyController', ["toaster", '$rootScope', '$scope', '$http', '$localStorage', '$state', '$timeout', function (toaster, $rootScope, $scope, $http, $localStorage, $state, $timeout) {

    function init() {
        $scope.news = $localStorage.news;

        $http.get('news/' + $scope.news.id).success(function (data) {
            $scope.news.content = data.content;
        });

        $http.get("json/newsType.json").success(function (data) {
            $scope.newsTypes = data;
            angular.forEach(data, function (data, index, array) {
                if (data.id == $localStorage.news.newsType) {
                    $scope.newsType = array[index];
                }
            })
        }).error(function (err) {
            alert(err.error);
        });
    }

    init();

    var imgUrl = [];
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };
    $scope.pop = function (type, title, text) {
        toaster.pop(type, '', text);
    };

    $scope.modify = function () {
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

        var newsUrl = $scope.news.imgUrls;
        for (var i in newsUrl) {
            if ($scope.news.content.indexOf(newsUrl[i]) != -1) {
                if (urls == '') {
                    urls = newsUrl[i];
                } else {
                    urls = urls + ',' + newsUrl[i];
                }
            }
        }

        $scope.news.imgUrls = urls == '' ? null : urls;
        $scope.news.newsType = $scope.newsType.id;
        $http.put('news/activities', $scope.news).success(function (result) {
            if (result.status == 'SUCCESS') {
                $scope.pop('success', '', '修改成功');
                $timeout(function () {
                    $state.go('app.newsList');
                }, 2000);
            } else {
                $scope.pop('error', '', result.error);
            }
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
                $scope.url = result.data.url;
                imgUrl.push($scope.url);
            } else {
                $scope.error = result.error;
            }
        });
    };
}]);