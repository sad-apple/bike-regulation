app.controller('updateOperationOrgController', ['$scope', '$http', '$modalInstance', 'operationOrgId', function ($scope, $http, $modalInstance,operationOrgId) {

    function init(){
        $http.get('operation-orgs/'+ operationOrgId).success(function(data){
            $scope.operationOrgDetailsDto = data.data;
        })
    }
    
    init();
    /**
     * 保存客户信息
     */
    $scope.update = function () {
        $http.put('operation-orgs/'+$scope.operationOrgDetailsDto.id, $scope.operationOrgDetailsDto).success(function (data) {
            if(data.status == 'ERROR')
                $scope.pop('error','',data.error);
             else
                $scope.close('SUCCESS');
        }).error(function (err) {
            alert(err.error);
        })
    }

    $scope.timeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.foundTimeOpened = true;
    };

    /**
     * 关闭修改窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
}]);
