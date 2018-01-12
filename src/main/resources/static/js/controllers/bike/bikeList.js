'use strict';

app.controller('bikeListController', ['$scope', '$localStorage', '$http', '$modal', 'toaster', function ($scope, $localStorage, $http, $modal, toaster) {
    // 提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function (type, title, text) {
        toaster.pop(type, '', text);
    };

    // $scope.upExcel = function (type, title, text, name) {
    //     $scope.fileName = name;
    //     $scope.upSave();
    // };
    //
    //  // 批量导入单车
    // $scope.upSave = function () {
    //     $http.post('bikes/upload-bikes', $scope.fileName).success(function (data) {
    //         if(data.status == 'SUCCESS'){
    //             $scope.pop('success', '', '导入成功！');
    //             $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    //         }
    //     }).error(function (err) {
    //         alert(err.error);
    //     });
    // };

    function init() {
        $http.get('bike-types/collection').success(function (data) {
            var allTypes = {
                id: '0',
                name: '全部'
            };
            data.data.push(allTypes);
            $scope.bikeType = data.data[data.data.length - 1];
            $scope.bikeTypes = data.data;
        });
    }

    init();

    // ngGrid初始化数据
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
        data: 'bikes',
        enablePaging: true,
        showFooter: true,
        rowHeight: 41,
        headerRowHeight: 36,
        multiSelect: false,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        columnDefs: [
            {field: 'plateNumber', displayName: '车牌号码', width: '200px'},
            {field: 'type.name', displayName: '单车类型', width: '200px'},
            {
                field: 'factoryDate',
                displayName: '出厂日期',
                width: '200px',
                cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.factoryDate | date:"yyyy-MM-dd"}}</div>'
            },
            {field: 'status', displayName: '状态', width: '200px'},
            {
                field: 'remove', displayName: '操作', width: "300px",
                cellTemplate: '<button class="btn btn-primary btn-sm m-t-xs m-l-xs" title="编辑" style="margin-top: 2px" ng-click="editRowIndex(row.entity)">编辑</button>' +
                '<button ng-click="seeRowIndex(row.entity)" class="btn btn-info btn-sm m-t-xs m-l-xs" title="详情"  style="margin-top: 2px">详情</button>' +
                '<button class="btn btn-danger btn-sm m-t-xs m-l-xs" style="margin-top: 2px" confirm-button-type="danger" mwl-confirm message="确定删除?" title="删除" confirm-text="确定" cancel-text="取消" on-confirm="removeRowIndex(row.entity)">删除</button>'
            }
        ]
    };

    $scope.plateNumber = "";

    $scope.getPagedDataAsync = function (pageSize, page) {
        var url = 'bikes?page=' + page + '&size=' + pageSize;
        if ($scope.plateNumber != "") {
            url += '&plateNumber=' + $scope.plateNumber
        }
        if ($scope.bikeType != undefined && $scope.bikeType != "") {
            url += '&name=' + $scope.bikeType.name;
        }
        $http.get(url).success(function (pagedata) {
            $scope.bikes = pagedata.data.content;
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

    $scope.$watch('bikeType', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.search = function () {
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    };

    $scope.createBike = function () {
        var rtn = $modal.open({
            templateUrl: 'tpl/bike/create_bike.html',
            controller: 'createBikeController',
            resolve: {}
        });

        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '新增单车成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    };

    $scope.importBike = function () {
        var rtn = $modal.open({
            templateUrl: 'tpl/bike/import_bikes.html',
            controller: 'importBikeController',
            resolve: {}
        });

        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                // $scope.pop('success', '', '导入成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    };

    $scope.seeRowIndex = function (entity) {
        var rtn = $modal.open({
            templateUrl: 'tpl/bike/see_bike.html',
            controller: 'seeBikeController',
            resolve: {
                bike: function () {
                    return entity
                }
            }
        });

        rtn.result.then(function (status) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }, function () {
        });
    };

    $scope.editRowIndex = function (entity) {
        var id = this.row.entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/bike/update_bike.html',
            controller: 'updateBikeController',
            resolve: {
                bikeId: function () {
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
    };

    $scope.removeRowIndex = function (entity) {
        $http.delete('bikes/' + this.row.entity.id).success(function (data) {
            if (data.status == 'SUCCESS') {
                $scope.pop('success', '', '删除成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            } else {
                alert(data.error);
            }
        })
    }

}]);
