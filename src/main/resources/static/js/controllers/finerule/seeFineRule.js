app.controller('seeFineRuleController', ['$scope', '$http', '$modalInstance', 'fineRule', function ($scope, $http, $modalInstance,fineRule) {
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
        $scope.fineRule = fineRule;
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


