app.controller('seeDepositRuleController', ['$scope', '$http', '$modalInstance', 'depositRule', function ($scope, $http, $modalInstance,depositRule) {
    function init(){
        $scope.depositRule = depositRule;
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


