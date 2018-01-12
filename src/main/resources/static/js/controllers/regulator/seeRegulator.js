app.controller('seeRegulatorController', ['$scope', '$http', '$modalInstance', 'regulatorOrgDetailsID', function ($scope, $http, $modalInstance,regulatorOrgDetailsID) {
    function init() {
        $http.get('regulator-orgs/'+ regulatorOrgDetailsID).success(function (data) {
            $scope.regulatorOrgDetailsDto = data.data;
        }).error(function (err) {
            alert(err.error);
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


