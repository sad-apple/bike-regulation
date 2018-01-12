'use strict';
app.controller('newsListController', ["toaster",'$rootScope', '$scope', '$http', '$state', '$localStorage', function (toaster,$rootScope, $scope, $http, $state,$localStorage) {

    function init(){
        $http.get("json/newsType.json").success(function(data){
            $scope.newsTypes = data;
            var allTypes = {
                id : '0',
                name : '全部'
            };
            data.push(allTypes);
            $scope.newsType = data[data.length -1];
        }).error(function (err) {
            alert(err.error);
        });
    }

    init();

    $scope.newsType;
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10, 50, 100],
        pageSize: '10',
        currentPage: 1
    };

    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };
    
    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };
    
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var url = 'news?page='+page+'&size='+pageSize ;
        if ($scope.title == undefined)
            $scope.title = "";
        url += '&title=' + $scope.title;
        if ($scope.newsType != undefined && $scope.newsType != null)
        url += '&newsType=' + $scope.newsType.id;
        $http.get(url).success(function (pagedata) {
            if(pagedata){
                if(pagedata.status == 'SUCCESS'){
                    $scope.newsList = pagedata.data.content;
                    $scope.totalServerItems = pagedata.data.totalElements;
                }else {
                    $scope.pop('error', '', pagedata.error);
                    $scope.informationList = null;
                    $scope.totalServerItems = 0;
                }
            }
        }).error(function (err) {
            alert(err.error);
        });
    };

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.$watch('newsType', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'newsList',
        enablePaging: true,
        showFooter: true,
        multiSelect: false,
        showSelectionCheckbox: false,
        rowHeight: 41,
        headerRowHeight: 36,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        columnDefs: [
            { field: 'title', displayName: '标题'},
            { field: 'newsType', displayName: '活动类别', cellTemplate: '<div class="ngCellText ng-scope col1 colt1" >{{row.entity.newsType == 1 ? "优惠" : "公告" }}</div>' },
            { field: 'createDate', displayName: '创建时间',cellTemplate: '<div class="ngCellText ng-scope col1 colt1" >{{row.entity.createDate | date:"yyyy-MM-dd HH:mm:ss"}}</div>'},
            { field: 'author', displayName: '作者'},
            { field: '操作', cellTemplate: '<button class="btn btn-info btn-sm m-t-xs m-l-xs" ng-click="modify(row.entity)">编辑</button>' +
            '<button class="btn btn-danger btn-sm m-t-xs m-l-xs" confirm-button-type="danger" mwl-confirm message="确定删除?" title="删除" confirm-text="确定" cancel-text="取消" on-confirm="delete(row.entity)">删除</button>'}
        ]
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);

    $scope.search = function () {
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    }

    $scope.modify = function(row){
        $localStorage.news = row;
        $state.go('app.newsModify');
    };

    $scope.delete = function(row){
        $http.delete('news/'+row.id).success(function(result){
            if(result.status == 'SUCCESS'){
                $scope.pop('success','', '删除成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }else{
                $scope.pop('error', '', result.error);
            }
        }).error(function (err) {
            alert(err.error);
        });
    };

    $scope.change = function(){
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    };

    $scope.publish = function(){
        $state.go('app.newsPublish');
    };
}]);