app.controller('createBikeTypeCmdController', ['$scope', '$http', '$modalInstance', function ($scope, $http, $modalInstance) {

    function init(){
        $http.get("bike-types/collection").success(function(data){
            $scope.bikeTypes=data.data;
        });
    }

    init();

    $scope.create = function () {
        $http.post('biketypecmds', $scope.bikeTypeCmdDto).success(function (data) {
            if(data.status=="ERROR"){
                $scope.pop('error', '', data.error);
            }else{
                $scope.close('SUCCESS');
            }
        })
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


