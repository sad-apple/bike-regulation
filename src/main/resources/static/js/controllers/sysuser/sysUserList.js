'use strict';

app.controller('sysUserListController', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {
    $scope.username = "";
    $scope.fullName = "";

    //ngGrid初始化数据
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };

    //提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };
    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    $scope.pagingOptions = {
        pageSizes: [10, 15, 20],
        pageSize: '10',
        currentPage: 1
    };

    $scope.gridOptions = {
        data: 'codes',
        enablePaging: true,
        showFooter: true,
        rowHeight: 41,
        headerRowHeight: 36,
        multiSelect: false,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        columnDefs: [
            { field: 'username', displayName: '账户登录名', width:'150px' },
            { field: 'fullName', displayName: '账户姓名', width:'150px' },
            { field: 'phone', displayName: '手机号', width:'150px' },
            { field: 'email', displayName: '邮箱', width:'150px' },
            { field: 'userStatus', displayName: '账户状态', width:'150px',cellTemplate: '<div class="ui-grid-cell-contents" >{{row.entity.userStatus == 1 ? "启用" : "禁用" }}</div>' },
            { field: 'userType', displayName: '账户角色', width:'150px',cellTemplate: '<div class="ui-grid-cell-contents" >{{ row.entity.userType | reverse }}</div>' },
            { field: 'remove', displayName: '操作', width: "400px", cellTemplate: '<a ng-click="editRowIndex(row.entity)" title="编辑" class="btn btn-default m-l-xs" style="margin-top: 2px"><i class="fa fa-pencil"></i></a>' +
            '<a mwl-confirm message="确定删除?" title="删除" confirm-text="确定" cancel-text="取消" confirm-button-type="danger" on-confirm="removeRowIndex(row.entity)" class="btn btn-default m-l-xs" style="margin-top: 2px"><i class="fa fa-times"></i></a>' +
            '<a ng-click="editPassword(row.entity)" title="编辑密码" class="btn btn-default m-l-xs" style="margin-top: 2px"><i class="icon-key"></i></a>' +
            '<a ng-click="seeRowIndex(row.entity)" title="详情" class="btn btn-default m-l-xs" style="margin-top: 2px"><i class="fa fa-info-circle"></i></a>' }
        ]
    };

    app.filter('reverse', function() {
        return function(type) {
            if (1 == type) {
                return "管理员"
            } else if (3 == type) {
                return "骑行用户"
            } else if (4 == type) {
                return "单车车主"
            } else if (5 == type) {
                return "运营企业"
            } else if (6 == type) {
                return "监管机构"
            } else {
                return "普通用户"
            }
        }
    });

    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var url = 'sysusers?page=' + page + '&size=' + pageSize + '&username=' +$scope.username ;
        if($scope.fullName != ""){
            url+="&fullName="+$scope.fullName;
        }
        if ($scope.role != undefined && $scope.role != "") {
            url+="&userType=" + $scope.role.id;
        }

        $http.get(url).success(function (pagedata) {
            $scope.codes = pagedata.data.content;
            $scope.totalServerItems = pagedata.data.totalElements;
        });
    };
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, "");
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    $scope.search = function(){
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, '');
    }

    function init(){
        $http.get("sysusers/getLoginSysUser").success(function(data){
            $scope.loginUser = data.data;
        });

        $http.get('sysroles/getAllSysRole').success(function (data){
            $scope.roles = data.data;
        });
        
    }
    init();

    $scope.createSysUser = function(){
        //todo
        if(0 == $scope.loginUser.userType){
            $scope.pop('error', '', '您不可以新增用户');
            return;
        }

        var rtn = $modal.open({
            templateUrl: 'tpl/sysuser/create_sysuser.html',
            controller: 'createSysUserController',
            resolve:{
            }
        });

        rtn.result.then(function (status) {
            if(status == 'SUCCESS') {
                $scope.pop('success', '', '新增用户信息成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        },function(){
        });
    }


    $scope.seeRowIndex = function(entity){
        var rtn = $modal.open({
            templateUrl: 'tpl/sysuser/see_sysuser.html',
            controller: 'seeSysUserController',
            resolve:{
                sysUser : function (){ return entity }
            }
        });
        rtn.result.then(function (status) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        },function(){
        });
    }

    $scope.editRowIndex = function(entity){
        if(this.row.entity.username=='leaduadmin'){
            $scope.pop('error', '', '管理员信息不能修改');
            return;
        }

        var id = this.row.entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/sysuser/update_sysuser.html',
            controller: 'updateSysUserController',
            resolve:{
                sysUserId:function(){return id;}
            }
        });
        rtn.result.then(function (status) {
            if(status == 'SUCCESS') {
                $scope.pop('success', '', '修改用户信息成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        },function(){
        });
    }

    $scope.editPassword = function(entity){
        var id = this.row.entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/sysuser/update_sysuser_password.html',
            controller: 'updateSysUserPasswordController',
            resolve:{
                sysUserId:function(){return id;}
            }
        });
        rtn.result.then(function (status) {
            if(status == 'SUCCESS'){
                $scope.pop('success','','修改用户密码成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }

        },function(){
        });
    }

    $scope.removeRowIndex = function(entity){
        if(this.row.entity.username=='leaduadmin'){
            $scope.pop('error', '', '管理员信息不能删除');
            return;
        }
        
        if($scope.loginUser.userType == 0){
            $scope.pop('error', '', '您不可以删除用户');
            return;
        }

        $http.delete('sysusers/'+this.row.entity.id).success(function(data) {
            if(data.status == 'SUCCESS'){
                $scope.pop('success','','删除成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }else{
                $scope.pop('error', '', data.error);
            }
        })
    }

}])
;