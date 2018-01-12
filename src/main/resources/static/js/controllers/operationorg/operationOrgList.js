'use strict';

app.controller('operationOrgListController', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {
    $scope.name = "";
    $scope.organizeNum = "";
    $scope.represent = "";
    $scope.contacts = "";
    $scope.phone = "";
    $scope.dutyPhone = "";

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
            {field: 'name', displayName: '组织名称', width: '200px'},
            {field: 'organizeNum', displayName: '组织机构编号', width: '200px'},
            {field: 'contacts', displayName: '组织联系人', width: '200px'},
            {field: 'phone', displayName: '组织联系电话', width: '200px'},
            {field: 'address', displayName: '办公地址', width: '200px'},
            {field: 'status', displayName: '状态', width: '200px', cellTemplate: '<div class="ngCellText ng-scope col4 colt4" >{{row.entity.status == 1 ? "启用" : "禁用" }}</div>'},
            {
                field: 'remove', displayName: '操作', width: "400px",
                cellTemplate: '<button class="btn btn-primary btn-sm m-t-xs m-l-xs" title="编辑" style="margin-top: 2px" ng-click="editRowIndex(row.entity)">编辑</button>' +
                '<button ng-click="seeRowIndex(row.entity)" class="btn btn-info btn-sm m-t-xs m-l-xs" title="详情"  style="margin-top: 2px">详情</button>' +
                '<button class="btn btn-info btn-sm m-t-xs m-l-xs" style="margin-top: 2px" confirm-button-type="info" mwl-confirm message="确定启用?" title="状态" confirm-text="确定" cancel-text="取消" on-confirm="enableAccount(row.entity)">启用</button>' +
                '<button class="btn btn-danger btn-sm m-t-xs m-l-xs" style="margin-top: 2px" confirm-button-type="danger" mwl-confirm message="确定禁用?" title="状态" confirm-text="确定" cancel-text="取消" on-confirm="disableAccount(row.entity)">禁用</button>'
            }
        ]
    };
    
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var url = 'operation-orgs?page=' + page + '&size=' + pageSize;
        if ($scope.name != "")
            url += "&name=" + $scope.name;
        if ($scope.organizeNum != "")
            url += "&organizeNum=" + $scope.organizeNum;
        if ($scope.represent != "")
            url += "&represent=" + $scope.represent;
        if ($scope.contacts != "")
            url += "&contacts=" + $scope.contacts;
        if ($scope.phone != "")
            url += "&phone=" + $scope.phone;
        if ($scope.dutyPhone != "")
            url += "&dutyPhone=" + $scope.dutyPhone;

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

    $scope.createOperationOrg = function () {
        var rtn = $modal.open({
            templateUrl: 'tpl/operationorg/create_operationOrg.html',
            controller: 'createOperationOrgController',
            resolve: {}
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '新增客户信息成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    $scope.seeRowIndex = function (entity) {
        var id = entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/operationorg/see_operationOrg.html',
            controller: 'seeOperationOrgController',
            resolve: {
                operationOrgId: function () {
                    return id
                }
            }
        });
        rtn.result.then(function (status) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }, function () {
        });
    }

    $scope.editRowIndex = function (entity) {
        var id = entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/operationorg/update_operationOrg.html',
            controller: 'updateOperationOrgController',
            resolve: {
                operationOrgId: function () {
                    return id;
                }
            }
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '修改客户信息成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    $scope.enableAccount = function (entity) { // 启用运营组织账户
        $http.get('operation-orgs/enable/'+ entity.id).success(function (data) {
            if (data.status == "SUCCESS")
                $scope.pop('success', '', '启用账户成功');
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }).error(function (err) {
            alert(err.error);
        });
    }

    $scope.disableAccount = function (entity) { // 禁用运营组织账户
        $http.get('operation-orgs/disable/'+ entity.id).success(function (data) {
            if (data.status == "SUCCESS")
                $scope.pop('success', '', '禁用账户成功');
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }).error(function (err) {
            alert(err.error);
        });
    }

}]);
