/**
 * Created by zhaochuanzhi on 2017/8/1.
 */
'use strict';
app.controller('contentListController', ["toaster", '$rootScope', '$scope', '$http', '$modal', '$state', '$localStorage', function (toaster, $rootScope, $scope, $http, $modal, $state, $localStorage) {

    $scope.problemType;

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
        pageSizes: [10, 50, 100],
        pageSize: '10',
        currentPage: 1
    };

    $scope.gridOptions = {
        data: 'contentList',
        enablePaging: true,
        showFooter: true,
        multiSelect: false,
        showSelectionCheckbox: false,
        rowHeight: 41,
        headerRowHeight: 36,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        columnDefs: [
            {field: 'id', displayName: '序号', width: '100px'},
            {field: 'problemType.name', displayName: '问题类型', width: '200px'},
            {field: 'problemName', displayName: '问题名称', width: '200px'},
            {
                field: 'content',
                displayName: '内容',
                width: '200px',
                cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.content | removeHtmlTag }}</div>'
            },
            {
                field: 'createDate',
                displayName: '创建时间',
                width: '200px',
                cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.createDate | date:"yyyy-MM-dd"}}</div>'
            },
            {
                field: 'remove', displayName: '操作', width: '400px',
                cellTemplate: '<button class="btn btn-primary btn-sm m-t-xs m-l-xs" ng-click="seeRowIndex(row.entity)">查看</button>' +
                '<button class="btn btn-info btn-sm m-t-xs m-l-xs" ng-click="editRowIndex(row.entity)">编辑</button>' +
                '<button class="btn btn-danger btn-sm m-t-xs m-l-xs" confirm-button-type="danger" mwl-confirm message="确定删除?" title="删除" confirm-text="确定" cancel-text="取消" on-confirm="removeRowIndex(row.entity)">删除</button>'
            }
        ]
    };

    /**
     * 过滤内容里的Html标签
     */
    app.filter('removeHtmlTag', function () {
        return function (content) {
            var content = content.substring(content.indexOf(">") + 1);
            return content;
        }
    });

    $scope.getPagedDataAsync = function (pageSize, page) {
        var url = 'problems?page=' + page + '&size=' + pageSize;
        $http.get(url).success(function (pagedata) {
            $scope.contentList = pagedata.data.content;
            $scope.totalServerItems = pagedata.data.totalElements;
        }).error(function (err) {
            alert(err.error);
        });
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.search = function () {
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }

    /**
     * 创建问题
     */
    $scope.createProblem = function () {
        var rtn = $modal.open({
            templateUrl: 'tpl/contentManage/create_problem.html',
            controller: 'createProblemController',
            size: 'lg',
            resolve: {}
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '新增问题信息成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    /**
     * 查看问题
     * @param entity
     */
    $scope.seeRowIndex = function (entity) {
        var id = entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/contentManage/see_problem.html',
            controller: 'seeProblemController',
            size: 'lg',
            resolve: {
                problemId: function () {
                    return id
                }
            }
        });
        rtn.result.then(function (status) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }, function () {
        });
    }

    /**
     * 修改问题
     * @param entity
     */
    $scope.editRowIndex = function (entity) {
        var id = entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/contentManage/update_problem.html',
            controller: 'updateProblemController',
            size: 'lg',
            resolve: {
                problemId: function () {
                    return id;
                }
            }
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '修改问题内容成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    /**
     * 删除问题
     * @param entity
     */
    $scope.removeRowIndex = function (entity) {
        $http.delete('problems/' + entity.id).success(function (data) {
            if (data.status == 'SUCCESS') {
                $scope.pop('success', '', '删除成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            } else {
                alert(data.error);
            }
        })
    }

    /**
     * 用户协议
     */
    $scope.modifyUserProtocol = function () {
        var rtn = $modal.open({
            templateUrl: 'tpl/contentManage/userProtocol_modify.html',
            controller: 'modifyUserProtocolController',
            size: 'lg',
            resolve: {}
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '修改用户协议内容成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    /**
     * 押金说明
     */
    $scope.modifyDepositStatement = function () {
        var rtn = $modal.open({
            templateUrl: 'tpl/contentManage/depositStatement_modify.html',
            controller: 'modifyDepositStatementController',
            size: 'lg',
            resolve: {}
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '修改押金说明内容成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    /**
     *  修改充值协议
     */
    $scope.modifyRechargeProtocol = function () {
        var rtn = $modal.open({
            templateUrl: 'tpl/contentManage/recharge_protocol_modify.html',
            controller: 'modifyRechargeProtocolController',
            size: 'lg',
            resolve: {}
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '修改充值协议内容成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    /**
     *  修改用户服务协议
     */
    $scope.modifyUserServiceProtocol = function () {
        var rtn = $modal.open({
            templateUrl: 'tpl/contentManage/user_service_protocol_modify.html',
            controller: 'modifyUserServiceProtocolController',
            size: 'lg',
            resolve: {}
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '修改充值协议内容成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

}]);
