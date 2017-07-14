app.controller('updateRiderPasswordController', ['$scope', '$http', '$modalInstance', 'customerId', function ($scope, $http, $modalInstance,customerId) {
    /**
     * 修改骑行用户密码
     */
    $scope.updatePwd = function () {
        $http.put(
            'customers/rider/'+ customerId+'/updateRiderPassword',
            {
                oldPwd : $scope.oldPwd,
                newPwd : $scope.newPwd
            }).success(function (data) {
            $scope.close(data);
        }).error(function (err) {
            alert(err.error);
        });
    }

    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
}]);
