app.controller('updateBikeOwnerController', ['$scope', '$http', '$modalInstance', 'customerId', 'toaster',function ($scope, $http, $modalInstance,customerId,toaster) {

    // 提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    function init(){
        $http.get('bike-owners/' + customerId).success(function(data){
            $scope.bikeOwnerDto = data.data;
        }).error(function (err) {
            alert(err.error);
        });
    }

    init();
    
    /**
     * 保存角色
     */
    $scope.update = function () {
        $http.put('bike-owners/' + $scope.bikeOwnerDto.id, $scope.bikeOwnerDto).success(function (data) {
            if(data.status == "ERROR"){
                $scope.pop('error', '', data.error);
            }else{
                $scope.close('SUCCESS');
            }
        }).error(function (err) {
            alert(err.error);
        });
    };
    
    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
}]);
