'use strict';

app.controller('fileListCtrl', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {

    $scope.username = "";
    $scope.fullName = "";

    /**
     * 获取登录用户信息
     */
    function init(){
        $http.get("sysusers/login-sysuser").success(function(data){
            $scope.loginUser = data.data;
        }).error(function (err) {
            alert(err.error);
        });

        $http.get('files/file-type').success(function (data){
            var allTypes = {
                id : 0,
                name : '全部'
            };
            data.data.push(allTypes);
            $scope.fileType = data.data[data.data.length -1];
            $scope.fileTypes = data.data;
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
        filterText: '',
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
            { field: 'fileType.name', displayName: '文件类型', width:'150px' },
            { field: 'businessName', displayName: '业务名称', width:'150px' },
            { field: 'createTime', displayName: '创建时间', width:'150px' ,cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.createTime | date:"yyyy-MM-dd"}}</div>'},
            { field: 'remark', displayName: '备注', width:'150px' },
            {
                field: 'remove', displayName: '操作', width: "400px",
                cellTemplate: '<button class="btn btn-primary btn-sm m-t-xs m-l-xs" title="编辑" style="margin-top: 2px" ng-click="editRowIndex(row.entity)">编辑</button>' +
                '<button  class="btn btn-info btn-sm m-t-xs m-l-xs" title="详情"  style="margin-top: 2px" ng-click="seeRowIndex(row.entity)">详情</button>' +
                '<button class="btn btn-danger btn-sm m-t-xs m-l-xs" style="margin-top: 2px" confirm-button-type="danger" mwl-confirm message="确定删除?" title="删除" confirm-text="确定" cancel-text="取消" on-confirm="removeRowIndex(row.entity)">删除</button>' }
        ]
    };

    $scope.businessName = "";
    $scope.fileType;

    $scope.getPagedDataAsync = function (pageSize, page, searchText) {

        var url = 'files?page=' + page + '&size=' + pageSize ;
        if($scope.businessName != ""){
            url += '&businessName=' + $scope.businessName;
        }
        if($scope.fileType != undefined && $scope.fileType != ""){
            url += '&name=' + $scope.fileType.name;
        }
        
        $http.get(url).success(function (pagedata) {
            $scope.codes = pagedata.data.content;
            $scope.totalServerItems = pagedata.data.totalElements;
        }).error(function (err) {
            alert(err.error);
        });
    };
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
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

    $scope.$watch('fileType', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.search = function(){
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    }
    
    

    /**
     * 新增文件
     */
    $scope.createFile = function(){
        var rtn = $modal.open({
            templateUrl: 'tpl/file/create_file.html',
            controller: 'createFileController',
            resolve:{
            }
        });
        rtn.result.then(function (status) {
            if(status == 'SUCCESS') {
                $scope.pop('success', '', '新增文件成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        },function(){
        });
    };

    /**
     * 查看文件
     * @param entity
     */
    $scope.seeRowIndex = function(entity){
        var rtn = $modal.open({
            templateUrl: 'tpl/file/see_file.html',
            controller: 'seeFileController',
            resolve:{
                file : function (){ return entity }
            }
        });
        rtn.result.then(function (status) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        },function(){
        });
    };

    /**
     * 编辑文件
     * @param entity
     */
    $scope.editRowIndex = function(entity){
        var id = this.row.entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/file/update_file.html',
            controller: 'updateFileController',
            resolve:{
                file:function(){return entity;}
            }
        });
        rtn.result.then(function (status) {
            if(status == 'SUCCESS') {
                $scope.pop('success', '', '修改文件信息成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        },function(){
        });
        
    };

    /**
     * 删除文件
     * @param entity
     */
    $scope.removeRowIndex = function(entity){
        $http.delete('files/'+this.row.entity.id).success(function(data) {
            if(data.status == 'SUCCESS'){
                $scope.pop('success','','删除成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }else{
                alert(data.error);
            }
        }).error(function (err) {
            alert(err.error);
        });
    }
    
}])
;