app.controller('seeBikeController', ['$scope', '$http', '$modalInstance', 'bike', '$filter', function ($scope, $http, $modalInstance, bike, $filter) {

    function init() {
        $http.get("vehiclegroups/getAll").success(function (data) {
            $scope.vehicleGroups = data.data;
        });
    }

    init();

    $scope.bike = bike;
    $scope.factoryDate = $filter("date")(bike.factoryDate, "yyyy-MM-dd");
    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function (status) {
        $modalInstance.close(status);
    };
}]);


