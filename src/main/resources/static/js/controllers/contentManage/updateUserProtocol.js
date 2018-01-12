/**
 * Created by zhaochuanzhi on 2017/8/2.
 */

app.controller('modifyUserProtocolController', ['$scope', '$http', '$modalInstance',  function ($scope, $http, $modalInstance) {
    function init() {
        $http.get('user-protocol/1').success(function (data) {
            $scope.userProtocol = data.data;
        }).error(function(err){
            alert(err.error);
        });

    }

    init();

    $scope.modify = function () {
        $http.put('user-protocol/', $scope.userProtocol).success(function (data) {
            if(data.status == 'ERROR')
                $scope.pop('error','',data.error);
            else
                $scope.close('SUCCESS');
        }).error(function (err) {
            alert(err.error);
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
