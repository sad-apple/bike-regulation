
app.controller('createDepositRuleController', ['$scope', '$http', '$modalInstance', 'toaster', function ($scope, $http, $modalInstance,toaster) {
    
    //初始化操作
    function init(){
        $scope.depositRule={};
        $scope.depositRule.depositStatus="0";
        $scope.depositRule.payStatus="2";
        $scope.depositRule.representStatus="4";
    }
    
    init();

    //提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function (type, title, text) {
        toaster.pop(type, '', text);
    };


    /**
     * 创建押金规则
     */
    $scope.create = function () {
      
        $http.post('deposit-rules', $scope.depositRule).success(function (data) {
            if(data.status=="ERROR"){
                $scope.pop('error', '', data.error);
            }else{
                $scope.close('SUCCESS');
            }
        }).error(function (err) {
            alert(err.error);
        });
    }

    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };

}]);


