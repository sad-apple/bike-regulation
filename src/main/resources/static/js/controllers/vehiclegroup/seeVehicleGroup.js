app.controller('seeVehicleGroupController', ['$scope', '$http', '$modalInstance', 'vehicleGroup', function ($scope, $http, $modalInstance,vehicleGroup) {

    $scope.vehicleGroup=vehicleGroup;
    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
}]);


