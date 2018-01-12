app.controller('createRegulatorController', ['$scope', '$http', '$modalInstance', 'toaster', function ($scope, $http, $modalInstance, toaster) {

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    /**
     * 检查用户是否已存在
     */
    $scope.check = function () {
        $http.post('regulator-orgs/'+ $scope.regulatorOrgDetailsDto.adminName).success(function (data) {
            if(data.status == "ERROR"){
                $scope.pop('error', '', data.error);
            }
        }).error(function (err) {
            alert(err.error);
        })
    };

    /**
     * 机构信息
     */
    $scope.create = function () {
        $http.post('regulator-orgs', $scope.regulatorOrgDetailsDto).success(function (data) {
            if(data.status=="ERROR"){
                $scope.pop('error', '', data.error);
            }else{
                $scope.close('SUCCESS');
            }
        }).error(function (err) {
            alert(err.error);
        })
    };

    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };

    $scope.timeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.foundTimeOpened = true;
    };
}]);


