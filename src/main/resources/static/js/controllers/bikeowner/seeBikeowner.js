app.controller('seeBikeOwnerController', ['$scope', '$http', '$modalInstance', 'bikeOwnerDto', function ($scope, $http, $modalInstance,bikeOwnerDto) {

    function init(){
        $scope.roles = bikeOwnerDto.roles;
        $scope.bikeOwnerDto = bikeOwnerDto;
       
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


