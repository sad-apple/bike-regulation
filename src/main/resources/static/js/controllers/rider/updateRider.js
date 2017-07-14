app.controller('updateRiderController', ['$scope', '$http', '$modalInstance', 'customerId', function ($scope, $http, $modalInstance,customerId) {
    function init(){
        $http.get('customers/rider/'+ customerId).success(function(data){
            $scope.roles = data.data.roles;
            $scope.riderDto = data.data;
        }).error(function (err) {
            alert(err.error);
        });
    }

    init();

    /**
     * 保存角色
     */
    $scope.update = function () {
        $http.put('customers/rider/'+$scope.riderDto.id, $scope.riderDto).success(function (data) {
            $scope.close('SUCCESS');
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
