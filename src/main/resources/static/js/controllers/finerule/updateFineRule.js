app.controller('updateFineRuleController', ['$scope', '$http', '$modalInstance', 'fineRuleId', 'toaster',function ($scope, $http, $modalInstance,fineRuleId,toaster) {
    function init(){
        $http.get('fine-rules/'+ fineRuleId).success(function(data){
            $scope.fineRule = data.data;
        }).error(function (err) {
            alert(err.error);
        });
    }

    init();
    
    
    /**
     * 保存角色
     */
    $scope.update = function () {
        $http.put('fine-rules/'+$scope.fineRule.id, $scope.fineRule).success(function (data) {
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
