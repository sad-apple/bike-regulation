/**
 * Created by zhaochuanzhi on 2017/8/2.
 */

app.controller('updateProblemController', ['$scope', '$http', '$modalInstance', 'problemId', function ($scope, $http, $modalInstance,problemId) {

    function init(){
        $http.get('problems/'+ problemId).success(function(data){
            $scope.problem = data.data;
        }).error(function(err){
            alert(err.error);
        });

        $http.get('problems/collection').success(function(data){
            $scope.problemTypes = data.data;
        }).error(function(err){
            alert(err.error);
        });
    }
    init();
    /**
     * 修改并保存问题
     */
    $scope.update = function () {
        $http.put('problems/', $scope.problem).success(function (data) {
            if(data.status == 'ERROR')
                $scope.pop('error','',data.error);
            else
                $scope.close('SUCCESS');
        }).error(function (err) {
            alert(err.error);
        })
    }

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

