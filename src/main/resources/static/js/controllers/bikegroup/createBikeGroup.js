app.controller('createBikeGroupController',  ['$scope', '$http', '$modalInstance', 'toaster',function ($scope, $http, $modalInstance,toaster) {
    // 提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    $scope.create = function () {
        $http.post('bike-groups', $scope.bikeGroupDto).success(function (data) {
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

    $scope.timeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.foundTimeOpened = true;
    };

}]);


