app.controller('updateBikeTypeCmdController', ['$scope', '$http', '$modalInstance', 'bikeTypeCmdId', function ($scope, $http, $modalInstance,bikeTypeCmdId) {
    function init(){
        $http.get("bike-types/collection").success(function(data){
            $scope.bikeTypes=data.data;
        });

        $http.get('biketypecmds/'+ bikeTypeCmdId).success(function(data){
            $scope.bikeTypeCmdDto = data.data;
        })
    }
    
    init();

    /**
     * 保存信息
     */
    $scope.update = function () {
        $http.put('biketypecmds/'+bikeTypeCmdId, $scope.bikeTypeCmdDto).success(function (data) {
            $scope.close('SUCCESS');
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
