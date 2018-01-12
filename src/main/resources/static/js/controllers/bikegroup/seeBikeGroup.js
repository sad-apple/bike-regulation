app.controller('seeBikeGroupController', ['$scope', '$http', '$modalInstance', 'bikeGroupDto', function ($scope, $http, $modalInstance,bikeGroupDto) {

    $scope.bikeGroupDto = bikeGroupDto;
    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
    
}]);


