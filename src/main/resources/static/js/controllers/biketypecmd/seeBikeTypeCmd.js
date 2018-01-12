/**
 * Created by qiaohao on 2016/12/6.
 */
app.controller('seeBikeTypeCmdController', ['$scope', '$http', '$modalInstance', 'bikeTypeCmd', function ($scope, $http, $modalInstance,bikeTypeCmd) {

    $scope.bikeTypeCmd = bikeTypeCmd;
    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
}]);


