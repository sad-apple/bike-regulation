/**
 * Created by lihao on 2017/8/2.
 */

app.controller('modifyUserServiceProtocolController', ['$scope', '$http', '$modalInstance',  function ($scope, $http, $modalInstance) {
    function init() {
        $http.get('user-service-protocol/1').success(function (data) {
            $scope.userServiceProtocol = data.data;
        }).error(function(err){
            alert(err.error);
        });

    }

    init();

    $scope.modify = function () {
        $http.put('user-service-protocol/', $scope.userServiceProtocol).success(function (data) {
            if(data.status == 'ERROR')
                $scope.pop('error','',data.error);
            else
                $scope.close('SUCCESS');
        }).error(function (err) {
            alert(err.error);
        })
    }

    /**
     * 关闭修改窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
    
}]);
