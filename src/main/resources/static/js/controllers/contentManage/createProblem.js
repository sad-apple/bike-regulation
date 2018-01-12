/**
 * Created by zhaochuanzhi on 2017/8/1.
 */

app.controller('createProblemController', ['$scope', '$http', '$modalInstance', 'toaster', function ($scope, $http, $modalInstance, toaster) {
    
    $scope.problemType;
    $scope.problemTypes;

    //提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    function init(){
        $http.get('problems/collection').success(function (data){
            $scope.problemType = data.data[data.data.length -1];
            $scope.problemTypes = data.data;
        }).error(function(err){
            alert(err.error);
        });
    }

    init();

    /**
     * 创建问题
     */
    $scope.create = function () {
        $http.post('problems', $scope.problem).success(function (data) {
            if(data.status == "ERROR")
                $scope.pop('error', '', data.error);
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

    $scope.timeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.foundTimeOpened = true;
    };
}]);



