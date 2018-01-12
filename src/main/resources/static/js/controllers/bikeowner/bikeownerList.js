'use strict';

app.controller('bikeOwnerListCtrl', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {

    $scope.username = "";

    $scope.fullName = "";

    /**
     * 获取登录用户信息
     */
    function init(){
        $http.get("sysusers/login-sysuser").success(function(data){ 
            $scope.loginUser = data.data;
        });
    }

    init();

    //提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    //ngGrid初始化数据
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };

    $scope.pagingOptions = {
        pageSizes: [20, 30, 40],
        pageSize: '20',
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
            { field: 'username', displayName: '用户名', width:'150px' },
            { field: 'fullName', displayName: '姓名', width:'150px' },
            { field: 'idCardNum', displayName: '身份证号', width:'150px' },
            { field: 'birthday', displayName: '生日', width:'150px' }, 
            { field: 'phone', displayName: '手机号', width:'150px' },
            { field: 'userStatus', displayName: '用户状态', width:'150px',cellTemplate: '<div class="ngCellText ng-scope col7 colt7" >{{row.entity.userStatus == 1 ? "启用" : "禁用" }}</div>' },
            { field: 'remove', displayName: '操作', width: "400px",
             cellTemplate: '<button class="btn btn-primary btn-sm m-t-xs m-l-xs" title="编辑" style="margin-top: 2px" ng-click="editRowIndex(row.entity)">编辑</button>' +
              '<button class="btn btn-warning btn-sm m-t-xs m-l-xs" title="编辑密码"  style="margin-top: 2px"  ng-click="editPassword(row.entity)">密码</button>' +
              '<button class="btn btn-info btn-sm m-t-xs m-l-xs" title="详情"  style="margin-top: 2px" ng-click="seeRowIndex(row.entity)">详情</button>' +
              '<button class="btn btn-danger btn-sm m-t-xs m-l-xs" style="margin-top: 2px" confirm-button-type="danger" mwl-confirm message="确定删除?" title="删除" confirm-text="确定" cancel-text="取消" on-confirm="removeRowIndex(row.entity)">删除</button>'
            }
        ]
    };

    $scope.getPagedDataAsync = function (pageSize, page) {
        var url = 'bike-owners?page=' + page + '&size=' + pageSize ;
        if (null != $scope.username && "" != $scope.username){
            url += '&username=' + $scope.username;
        }
        if(null != $scope.fullName && "" != $scope.fullName){
            url+='&fullName=' + $scope.fullName;
        }
        $http.get(url).success(function (pagedata) {
            $scope.codes = pagedata.data.content;
            $scope.totalServerItems = pagedata.data.totalElements;
        }).error(function (err) {
            alert(err.error);
        });
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.search = function(){
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }

    $scope.seeRowIndex = function(entity){
        var rtn = $modal.open({
            templateUrl: 'tpl/bikeowner/see_bikeowner.html',
            controller: 'seeBikeOwnerController',
            resolve:{
                bikeOwnerDto : function (){ return entity }
            }
        });
        rtn.result.then(function (status) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        },function(){
        });
    };

    $scope.editRowIndex = function(entity){
        var id = this.row.entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/bikeowner/update_bikeowner.html',
            controller: 'updateBikeOwnerController',
            resolve:{
                customerId:function(){return id;}
            }
        });
        rtn.result.then(function (status) {
            if(status == 'SUCCESS') {
                $scope.pop('success', '', '修改用户信息成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        },function(){
        });
    };

    /**
     * 创建车主
     */
    $scope.createOwner = function(){
        var rtn = $modal.open({
            templateUrl: 'tpl/bikeowner/create_bikeowner.html',
            controller: 'createBikeOwnerController',
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
    };
    
    /**
     * 修改密码
     * @param entity
     */
    $scope.editPassword = function(entity){
        var id = this.row.entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/bikeowner/update_bikeowner_password.html',
            controller: 'updateBikeOwnerPasswordController',
            resolve:{
                customerId:function(){return id;}
            }
        });
        rtn.result.then(function (status) {
            if(status.status == "SUCCESS"){
                $scope.pop('success','','修改密码成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
            if(status.status == "ERROR"){
                $scope.pop('error','', status.error);
            }
        },function(){
            
        });
    };

    /**
     * 删除车主
     * @param entity
     */
    $scope.removeRowIndex = function(entity){
        $http.delete('bike-owners/'+this.row.entity.id).success(function(data) {
            if(data.status == 'SUCCESS'){
                $scope.pop('success','','删除成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }else{
                $scope.pop('error', '', data.error);
            }
        }).error(function (err) {
            alert(err.error);
        });
    }
    
}])
;