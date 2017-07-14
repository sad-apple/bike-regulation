'use strict';

app.controller('navController', ['$scope', '$localStorage','$filter', '$state', '$window', function ($scope, $localStorage, $filter, $state, $window) {
    if($localStorage.userinfo == undefined || $localStorage.userinfo == null){
        $state.go("access.signin");
    }
    $scope.navIsShow = ($localStorage.userinfo.username == 'admin');
    var resources = $localStorage.userinfo.sysResources;
    var firstMenu = $filter('filter')(resources, function(data){return data.parentId === null});
    $scope.menus = [];
    for(var i in firstMenu){
        $scope.menus.push(getChildren(firstMenu[i]));
    }
    function getChildren(parent){
        parent.children = [];
        var children = $filter('filter')(resources, function(data){return data.parentId === parent.id});
        if(children.length != 0){
            for(var i in children){
                parent.children.push(getChildren(children[i]));
            }
        }
        return parent;
    }

    $window.addEventListener("beforeunload", function (e) {
        // var xmlhttp = new XMLHttpRequest();
        // xmlhttp.open("POST", "access/logout", false);//the false is for making the call synchronous
        // xmlhttp.setRequestHeader("Content-type", "application/json");
        // xmlhttp.send();
    });
}])
;