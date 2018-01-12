/**
 * Created by lihao on 2017/8/2.
 */

app.controller('modifyRechargeProtocolController', ['$scope', '$http', '$modalInstance',  function ($scope, $http, $modalInstance) {
    function init() {
        $http.get('recharge-protocol/1').success(function (data) {
            $scope.rechargeProtocol = data.data;
        }).error(function(err){
            alert(err.error);
        });

    }

    init();

    $scope.modify = function () {
        $http.put('recharge-protocol/', $scope.rechargeProtocol).success(function (data) {
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
