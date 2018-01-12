app.controller('seeOperationRuleController', ['$scope', '$http', '$modalInstance', 'operationRule', function ($scope, $http, $modalInstance,operationRule) {
    function init(){
        $scope.operationRule = operationRule;
        switch ($scope.operationRule.accountPattern) {
            case 1:
                $scope.accountPattern = "按小时计费";
                break;
            case 2:
                $scope.accountPattern = "按行驶次数计费";
                break;
            case 3:
                $scope.accountPattern = "按行驶路程计费";
                break;
        }
        $scope.proportion = $scope.operationRule.proportion + "%";
        $scope.riderFreeTime = "交完押金后免费骑行" + $scope.operationRule.riderFreeTime + "小时";
        $scope.bikeOwnerFreeTime = "交完押金后免费骑行" + $scope.operationRule.bikeOwnerFreeTime + "小时";
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


