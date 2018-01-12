/**
 * Created by zhaochuanzhi on 2017/7/27.
 */

'use strict';

app.controller('depositListController', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {
    $scope.name = "";
    $scope.userName = "";
    $scope.depositAccount = "";
    $scope.createTime = "";
    // 提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function (type, title, text) {
        toaster.pop(type, '', text);
    };

    //ngGrid初始化数据
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
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
            {field: 'name', displayName: '姓名', width: '200px'},
            {field: 'userName', displayName: '用户名', width: '200px'},
            {field: 'depositAmount', displayName: '押金金额(￥)', width: '200px'},
            {field: 'createTime', displayName: '注册时间', width: '200px',cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.createTime | date:"yyyy-MM-dd HH:mm:ss"}}</div>'  }
        ]
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var url = 'deposits?page=' + page + '&size=' + pageSize;
        if ($scope.name != "")
            url += "&name=" + $scope.name;
        if ($scope.userName != "")
            url += "&userName=" + $scope.userName;


        $http.get(url).success(function (pagedata) {
            $scope.codes = pagedata.data.content;
            $scope.totalServerItems = pagedata.data.totalElements;
        }).error(function (err) {
            alert(err.error);
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

    $scope.search = function () {
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, '');
    }
    
}]);

