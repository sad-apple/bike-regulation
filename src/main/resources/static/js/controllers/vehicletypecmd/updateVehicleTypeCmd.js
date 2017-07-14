app.controller('updateVehicleTypeCmdController', ['$scope', '$http', '$modalInstance', 'vehicleTypeCmdId', function ($scope, $http, $modalInstance,vehicleTypeCmdId) {
    function init(){
        $http.get("vehicletypes/getAll").success(function(data){
            $scope.vehicleTypes=data.data;
        });

        $http.get('vehicletypecmds/'+ vehicleTypeCmdId).success(function(data){
            $scope.vehicleTypeCmdDto = data.data;
        })
    }
    init();

    /**
     * 保存信息
     */
    $scope.update = function () {
        $http.put('vehicletypecmds/'+vehicleTypeCmdId, $scope.vehicleTypeCmdDto).success(function (data) {
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
