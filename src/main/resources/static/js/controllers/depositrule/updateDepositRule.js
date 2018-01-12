app.controller('updateDepositRuleController', ['$scope', '$http', '$modalInstance', 'depositRuleId', 'toaster',function ($scope, $http, $modalInstance,depositRuleId,toaster) {
    function init(){
        $http.get('deposit-rules/'+ depositRuleId).success(function(data){
            $scope.depositRule = data.data;
        }).error(function (err) {
            alert(err.error);
        });
    }

    init();
    
    // 提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };
    /**
     * 保存角色
     */
    $scope.update = function () {
        $http.put('deposit-rules/'+$scope.depositRule.id, $scope.depositRule).success(function (data) {
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
