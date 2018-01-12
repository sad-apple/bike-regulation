/**
 * Created by zhaochuanzhi on 2017/7/27.
 */

'use strict';

app.controller('fareListController', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {
    $scope.name = "";
    $scope.userName = "";
    $scope.plateNumber = "";
    $scope.time = "";
    $scope.rideAmount = "";
    $scope.userType = "";

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
            {field: 'plateNumber', displayName: '车牌号', width: '200px'},
            {field: 'rideAmount', displayName: '骑行金额(￥)', width: '200px'},
            {field: 'userType', displayName: '用户类型', width: '200px'},
            {field: 'time', displayName: '付款时间', width: '200px' ,cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.time | date:"yyyy-MM-dd HH:mm:ss"}}</div>'}

        ]
    };
    
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var url = 'fares?page=' + page + '&size=' + pageSize;
        if ($scope.name != "")
            url += "&name=" + $scope.name;
        if ($scope.userName != "")
            url += "&userName=" + $scope.userName;
        if ($scope.plateNumber != "")
            url += "&plateNumber=" + $scope.plateNumber;
        if ($scope.userType != "")
            url += "&userType=" + $scope.userType;

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

}])
;


