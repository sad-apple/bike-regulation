app.controller('updateBikeController', ['$scope', '$http', '$modalInstance', 'bikeId', function ($scope, $http, $modalInstance, bikeId) {
    function init() {

        $http.get("bikes/" + bikeId).success(function (data) {
            $scope.bike = data.data;
        })

        $http.get("bikegroups/getAll").success(function (data) {
            $scope.bikeGroups = data.data;
        });

        $http.get("bike-types/collection").success(function (data) {
            $scope.bikeTypes = data.data;
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
