app.controller('updateBikeGroupController', ['$scope', '$http', '$modalInstance', 'bikeGroupId', function ($scope, $http, $modalInstance,bikeGroupId) {
    function init(){
        $http.get('bike-groups/'+ bikeGroupId).success(function(data){
            $scope.bikeGroupDto = data.data;
        }).error(function (err) {
            alert(err.error);
        });
    }

    init();
    /**
     * 保存客户信息
     */
    $scope.update = function () {
        $http.put('bike-groups/'+$scope.bikeGroupDto.id, $scope.bikeGroupDto).success(function (data) {
            $scope.close('SUCCESS');
        }).error(function (err) {
            alert(err.error);
        });
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
