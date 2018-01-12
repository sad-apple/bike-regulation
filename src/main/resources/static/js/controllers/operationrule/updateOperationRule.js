app.controller('updateOperationRuleController', ['$scope', '$http', '$timeout', '$modalInstance', 'operationRuleId', 'toaster',function ($scope, $http, $timeout, $modalInstance,operationRuleId,toaster) {
    function init(){
        $http.get('operation-rules/'+ operationRuleId).success(function(data){
            $scope.operationRule = data.data;
        }).error(function (err) {
            alert(err.error);
        });
        
        $http.get("bike-types/collection").success(function (data) {
            $scope.bikeTypes = data.data;
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
        $scope.operationRule.bikeType =  $scope.operationRule.bikeType.name;
        $http.put('operation-rules/'+$scope.operationRule.id, $scope.operationRule).success(function (data) {
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
