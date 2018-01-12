
app.controller('createFileController', ['$scope', '$localStorage', '$http', '$modalInstance','toaster',function ($scope, $localStorage, $http, $modalInstance,toaster) {

    $scope.roles = null;
    $scope.checkRoles = [];

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    //获得获得文件类型列表
    function init(){
        $http.get('files/file-type').success(function (data){
            // data.data.splice(0,1);
            $scope.fileType = data.data[0];
            $scope.fileTypes = data.data;
        })
    }

    init();

    $scope.create = function () {
        $scope.file.fileType = $scope.fileType;
        $http.post('files/upload-image', $scope.file).success(function (data) {
            $localStorage.closeStatus = true;
            $scope.close('SUCCESS');
        })
    }

    $scope.selectFile = function(type,title,text,name){
        $scope.file.name = name;
        $scope.create();
    };

    /**
     * 关闭新增窗口
     * @param status
     */
    $scope.close = function(status){
        $modalInstance.close(status);
    };
    
}])
