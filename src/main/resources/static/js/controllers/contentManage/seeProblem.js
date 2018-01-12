/**
 * Created by zhaochuanzhi on 2017/8/2.
 */

app.controller('seeProblemController', ['$scope', '$http', '$modalInstance', 'problemId', function ($scope, $http, $modalInstance,problemId) {

    function init() {
        $http.get('problems/'+ problemId).success(function (data) {
            $scope.problem = data.data;
        }).error(function (err) {
            alert(err.error);
        });
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
