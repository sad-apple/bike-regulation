app.controller('createBikeController', ['$scope', '$http', '$modalInstance', 'toaster', function ($scope, $http, $modalInstance, toaster) {

    //提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    function init() {
        $http.get("vehiclegroups/getAll").success(function (data) {
            $scope.vehicleGroups = data.data;
        });

        $http.get("vehicletypes/getAll").success(function (data) {
            $scope.vehicleTypes = data.data;
        });
    }

    init();

    $scope.create = function () {
        $http.post('bikes', $scope.bike).success(function (data) {
            if (data.status == "SUCCESS")
                $scope.close('SUCCESS');
            else
                $scope.pop('error', '', data.error);
        }).error(function (err) {
            alert(err.error);
        });
    }

    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function (status) {
        $modalInstance.close(status);
    };

    $scope.timeTool = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.factoryDateOpened = true;
    };

    
}]);



