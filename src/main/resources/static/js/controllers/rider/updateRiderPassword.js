app.controller('updateRiderPasswordController', ['$scope', '$http', '$modalInstance', 'customerId', function ($scope, $http, $modalInstance, customerId) {
    /**
     * 修改骑行用户密码
     */
    $scope.updatePwd = function () {
        $http.put('riders/' + customerId + '/update-password', $scope.sysUser).success(function (data) {
            $scope.close(data);
        }).error(function (err) {
            alert(err.error);
        });
    }
    
    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function (status) {
        $modalInstance.close(status);
    };
}]);
