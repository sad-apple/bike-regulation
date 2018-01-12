app.controller('updateRegulatorController', ['$scope', '$http', '$modalInstance', 'regulatorDetailsId', function ($scope, $http, $modalInstance,regulatorDetailsId) {
    function init(){
        $http.get('regulator-orgs/'+ regulatorDetailsId).success(function(data){
            $scope.regulatorOrgDetailsDto = data.data;
        }).error(function (err) {
            alert(err.error);
        })
    }
    
    init();
    
    /**
     * 保存客户信息
     */
    $scope.update = function () {
        $http.put('regulator-orgs/'+$scope.regulatorOrgDetailsDto.id, $scope.regulatorOrgDetailsDto).success(function (data) {
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
