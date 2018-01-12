/**
 * Created by qiaohao on 2016/12/6.
 */
app.controller('seeOperationOrgController', ['$scope', '$http', '$modalInstance', 'operationOrgId', function ($scope, $http, $modalInstance,operationOrgId) {

    function init() {
        $http.get('operation-orgs/'+ operationOrgId).success(function (data) {
            $scope.operationOrgDetailsDto = data.data;
        }).error(function (err) {
            alert(err.error);
        });
    }

    init();
    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
}]);


