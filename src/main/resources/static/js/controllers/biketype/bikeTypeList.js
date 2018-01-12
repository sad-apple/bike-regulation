'use strict';

app.controller('bikeTypeListController', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {

    $scope.code = "";
    $scope.name = "";

    //提示信息
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
            {field: 'name', displayName: '单车类型名称', width: '200px'},
            {field: 'code', displayName: '单车类型代码', width: '200px'},
            {field: 'remark', displayName: '单车类型备注', width: '200px'},
            {
                field: 'remove', displayName: '操作', width: "400px",
                cellTemplate: '<button class="btn btn-primary btn-sm m-t-xs m-l-xs" title="编辑" style="margin-top: 2px" ng-click="editRowIndex(row.entity)">编辑</button>' +
                '<button class="btn btn-info btn-sm m-t-xs m-l-xs" title="详情"  style="margin-top: 2px"  ng-click="seeRowIndex(row.entity)">详情</button>' +
                '<button class="btn btn-danger btn-sm m-t-xs m-l-xs" style="margin-top: 2px" confirm-button-type="danger" mwl-confirm message="确定删除?" title="删除" confirm-text="确定" cancel-text="取消" on-confirm="removeRowIndex(row.entity)">删除</button>'
            }
        ]
    };

    $scope.getPagedDataAsync = function (pageSize, page) {
        var url = 'bike-types?page=' + page + '&size=' + pageSize + '&code=' + $scope.code + '&name=' + $scope.name;
        $http.get(url).success(function (pagedata) {
            $scope.codes = pagedata.data.content;
            $scope.totalServerItems = pagedata.data.totalElements;
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

    $scope.pop = function (type, title, text) {
        toaster.pop(type, '', text);
    };

    $scope.search = function () {
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }


    $scope.createBikeType = function () {
        var rtn = $modal.open({
            templateUrl: 'tpl/biketype/create_biketype.html',
            controller: 'createBikeTypeController',
            resolve: {}
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '新增单车类型信息成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    $scope.seeRowIndex = function (entity) {
        var rtn = $modal.open({
            templateUrl: 'tpl/biketype/see_biketype.html',
            controller: 'seeBikeTypeController',
            resolve: {
                bikeType: function () {
                    return entity
                }
            }
        });
        rtn.result.then(function (status) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }, function () {
        });
    }

    $scope.editRowIndex = function (entity) {
        var id = this.row.entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/biketype/update_biketype.html',
            controller: 'updateBikeTypeController',
            resolve: {
                bikeTypeId: function () {
                    return id;
                }
            }
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '修改单车类型信息成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    $scope.removeRowIndex = function (entity) {
        $http.delete('bike-types/' + this.row.entity.id).success(function (data) {
            if (data.status == 'SUCCESS') {
                $scope.pop('success', '', '删除成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            } else {
                alert(data.error);
            }
        })
    }

}])
;
