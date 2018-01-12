
app.controller('createRiderController', ['$scope', '$http', '$modalInstance','toaster',function ($scope, $http, $modalInstance,toaster) {

    $scope.roles = null;
    $scope.checkRoles = [];

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    //获得骑行用户列表
    function init(){
        $scope.riderDto={};
        $scope.riderDto.userStatus="1";
    }

    init();

    $scope.updateSelection = function($event,id){
        var checkbox = $event.target ;
        var checked = checkbox.checked ;
        if(checked){
            $scope.checkRoles.push(id) ;
        }else{
            var idx = $scope.checkRoles.indexOf(id) ;
            $scope.checkRoles.splice(idx,1) ;
        }
    } ;

    /**
     * 创建骑行用户信息
     */
    $scope.create = function () {
        $http.post('riders', $scope.riderDto).success(function (data) {
            if (data.status == 'ERROR')
                alert(data.error);
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
    
}])
