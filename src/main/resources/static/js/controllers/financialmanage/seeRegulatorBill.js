/**
 * Created by zhaochuanzhi on 2017/8/5.
 */

app.controller('seeRegulatorBillController', ['$scope', '$http', '$modalInstance', 'regulatorBillId', function ($scope, $http, $modalInstance,regulatorBillId) {
    function init() {
        $http.get('regulator-bills/'+ regulatorBillId).success(function (data) {
            $scope.regulatorBill = data.data;
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