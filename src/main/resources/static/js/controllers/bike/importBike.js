/**
 * Created by shuzhengxing on 2017/8/15.
 */
app.controller('importBikeController', ['$scope', '$http', '$modalInstance', 'toaster', function ($scope, $http, $modalInstance, toaster) {

    //提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    $scope.upExcel = function (type, title, text, name) {
        $scope.fileName = name;
        $scope.upSave();
    };

    // 批量导入单车
    $scope.upSave = function () {
        $http.post('bikes/upload-bikes', $scope.fileName).success(function (data) {
            if(data.status == 'SUCCESS'){
                $scope.pop('success', '', '导入成功！');
                $scope.close(data.status);
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }).error(function (err) {
            alert(err.error);
        });
    };

    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function (status) {
        $modalInstance.close(status);
    };

}]);



