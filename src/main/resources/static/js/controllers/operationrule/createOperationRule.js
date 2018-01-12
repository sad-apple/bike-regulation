app.controller('createOperationRuleController', ['$scope', '$http', '$modalInstance', 'toaster', function ($scope, $http, $modalInstance, toaster) {

    $scope.operationRule = {};
    
    //提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    function init() {
        $http.get("operation-orgs/collection").success(function (data) {
            $scope.operationOrgs = data.data;
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


    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    /**
     * 运营组织信息
     */
    $scope.create = function () {
        $scope.operationRule.bikeType =  $scope.operationRule.bikeType.name;
        $http.post('operation-rules', $scope.operationRule).success(function (data) {
            if(data.status == "ERROR")
                $scope.pop('error', '', data.error);
            else
                $scope.close('SUCCESS');
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


