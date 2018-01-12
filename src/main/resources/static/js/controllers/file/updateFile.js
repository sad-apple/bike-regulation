app.controller('updateFileController', ['$scope', '$http', '$localStorage', '$modalInstance', 'file', function ($scope, $http, $localStorage, $modalInstance,file) {
    function init(){
        $scope.file = file;
        $http.get('files/file-path').success(function (data){
            $scope.fileUrl = data.data + file.name;
            $scope.imageUrl = "files/file/" + $scope.file.id;
        })
        $http.get('files/file-type').success(function (data){
            $scope.fileTypes = data.data;
            angular.forEach(data.data,function (data, index, array) {
                if (data.id == file.fileType.id){
                    $scope.fileType = array[index];
                }
            })
        })
    }

    init();

    $scope.update = function () {
        $scope.file.fileType = $scope.fileType;
        $http.put('files/'+file.id, $scope.file).success(function (data) {
            $localStorage.closeStatus = true;
            $scope.close('SUCCESS');
        })
    }

    $scope.pop = function(type,title,text,name){
        $scope.file.name = name;
        $scope.update();
    };

    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
    
}]);
