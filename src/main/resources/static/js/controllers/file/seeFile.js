app.controller('seeFileController', ['$scope', '$http', '$modalInstance', 'file', function ($scope, $http, $modalInstance,file) {
    function init(){
        $scope.file = file;
        $http.get('files/file-path').success(function (data){
            $scope.fileUrl = data.data + file.name;
            $scope.imageUrl = "files/file/" + $scope.file.id;
        })
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


