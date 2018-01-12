app.controller('updateBikeTypeController', ['$scope', '$http', '$modalInstance', 'bikeTypeId', function ($scope, $http, $modalInstance,bikeTypeId) {
    function init(){
        $http.get('files/bike-image').success(function(data){
            $scope.files = data.data;
            getFile(data);
        })
    }

    function getFile(lastData) {
        $http.get('bike-types/'+ bikeTypeId).success(function(data){
            $scope.bikeType = data.data;
            angular.forEach(lastData.data,function (data,index,array) {
                if (data.id == $scope.bikeType.file.id){
                    $scope.file = array[index];
                    return;
                }
            })
        })
    }
    
    init();
    /**
     * 保存客户信息
     */
    $scope.update = function () {
        $scope.bikeType.file = $scope.file;
        $http.put('bike-types/'+$scope.bikeType.id, $scope.bikeType).success(function (data) {
            $scope.close('SUCCESS');
        })
    }

    $scope.$watch('file', function () {
        $scope.imageUrl = "files/file/" + $scope.file.id;
    });
    
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
