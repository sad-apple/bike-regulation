app.controller('updateBikeController', ['$scope', '$http', '$modalInstance', 'vehicleId', function ($scope, $http, $modalInstance, vehicleId) {
    function init() {

        $http.get("bikes/" + vehicleId).success(function (data) {
            $scope.bike = data.data;
        })

        $http.get("vehiclegroups/getAll").success(function (data) {
            $scope.vehicleGroups = data.data;
        });

        $http.get("vehicletypes/getAll").success(function (data) {
            $scope.vehicleTypes = data.data;
        });
    }

    init();
    /**
     * 保存客户信息
     */
    $scope.update = function () {
        $http.put('bikes/' + $scope.bike.id, $scope.bike).success(function (data) {
            $scope.close('SUCCESS');
        })
    }

    $scope.timeTool = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.factoryDateOpened = true;
    };

    /**
     * 关闭修改窗口
     * @param status
     */
    $scope.close = function (status) {
        $modalInstance.close(status);
    };
}]);
