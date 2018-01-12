/**
 * Created by zhaochuanzhi on 2017/8/5.
 */

app.controller('seeOperationBillController', ['$scope', '$http', '$modalInstance', 'operationBillId', function ($scope, $http, $modalInstance,operationBillId) {
    function init() {
        $http.get('operation-bills/'+ operationBillId).success(function (data) {
            $scope.operationBill = data.data;
        }).error(function (err) {
            alert(err.error);
        });
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