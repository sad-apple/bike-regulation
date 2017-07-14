app.controller('seeRiderController', ['$scope', '$http', '$modalInstance', 'riderDto', function ($scope, $http, $modalInstance,riderDto) {
    function init(){
        $scope.roles = riderDto.roles;
        $scope.riderDto = riderDto;
    }
    init();

    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
}]);


