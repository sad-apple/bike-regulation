
app.controller('createBikeOwnerController', ['$scope', '$http', '$modalInstance', 'toaster',function ($scope, $http, $modalInstance,toaster) {

    $scope.roles = null;
    $scope.checkRoles = [];

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
        $scope.bikeOwnerDto={};
        $scope.bikeOwnerDto.userStatus="1";
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
     * 创建单车车主
     */
    $scope.create = function () {
        $http.post('bike-owners', $scope.bikeOwnerDto).success(function (data) {
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
