/**
 * Created by shuzhengxing on 2017/8/8.
 */
app.controller('seeFaultController', ['$scope', '$http', '$modalInstance', 'IllegallyParked', '$filter', function ($scope, $http, $modalInstance, IllegallyParked, $filter) {

    $scope.IllegallyParked = IllegallyParked;
    $scope.bikeTypeImageUrl = "files/file/" +$scope.IllegallyParked.bikeType.file.id;
    $scope.parkedImageUrl = "files/file/" +$scope.IllegallyParked.file.id;
    $scope.reportDate = $filter("date")(IllegallyParked.time, "yyyy-MM-dd");
    
    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function (status) {
        $modalInstance.close(status);
    };
}]);


