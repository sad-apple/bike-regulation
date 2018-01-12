app.controller('createBikeTypeController', ['$scope', '$http', '$modal','$modalInstance', function ($scope, $http, $modal, $modalInstance) {

    function init(){
        $http.get('files/bike-image').success(function(data){
            $scope.file = data.data[0];
            $scope.files = data.data;
        })
        $http.get('files/file-path').success(function (data){
            $scope.fileUrl = data.data;
        })
    }
    init();
    
    $scope.create = function () {
        $scope.bikeType.file = $scope.file;
        $http.post('bike-types', $scope.bikeType).success(function (data) {
            if(data.status=="ERROR"){
                $scope.pop('error', '', data.error);
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

    $scope.timeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.foundTimeOpened = true;
    };

}]);


