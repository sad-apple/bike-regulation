app.controller('seeBikeTypeController', ['$scope', '$http', '$modalInstance', 'bikeType', function ($scope, $http, $modalInstance,bikeType) {

    $scope.bikeType = bikeType;
    $scope.imageUrl = "files/file/" + $scope.bikeType.file.id;
    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
}]);


