
app.controller('createSysUserController', ['$scope', '$http', '$modalInstance', function ($scope, $http, $modalInstance) {

    $scope.roles = null;
    $scope.checkRoles = [];

    //获得角色列表
    function init(){
        $http.get('sysroles/getAllSysRole').success(function (data){
            $scope.roles = data.data;
        });

        $scope.sysUser={};
        $scope.sysUser.userStatus="1";
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
     * 用户信息
     */
    $scope.create = function () {
        $http.post('sysusers', $scope.sysUser).success(function (data) {
            if(data.status=="ERROR"){
                alert(data.error);
            }else{
                $scope.close('SUCCESS');
            }
        })
    }

    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };

}]);


