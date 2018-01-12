'use strict';

app.controller('fineRuleListController', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {

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
        pageSizes: [10, 20, 30],
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
            {field: 'id', displayName: '序号', width: '200px'},
            {field: 'region', displayName: '所属区域', width: '200px'},
            {field: 'rule', displayName: '规则', width: '400px', cellTemplate: '<div class="ngCellText ng-scope col4 colt4" >{{getRule(row.entity.hours, row.entity.amount)}}</div>' },
            {field: 'createTime', displayName: '创建时间', width: '200px',cellTemplate: '<div class="ngCellText ng-scope col4 colt4" >{{row.entity.createTime | formatTime}}</div>' },
            {field: 'remove', displayName: '操作', width: "400px",
                cellTemplate: '<button class="btn btn-primary btn-sm m-t-xs m-l-xs" title="编辑" style="margin-top: 2px" ng-click="editRowIndex(row.entity)">编辑</button>' +
                '<button ng-click="seeRowIndex(row.entity)" class="btn btn-info btn-sm m-t-xs m-l-xs" title="详情"  style="margin-top: 2px">详情</button>' +
                '<button class="btn btn-danger btn-sm m-t-xs m-l-xs" style="margin-top: 2px" confirm-button-type="danger" mwl-confirm message="确定删除?" title="删除" confirm-text="确定" cancel-text="取消" on-confirm="removeRowIndex(row.entity)">删除</button>'
            }
        ]
    };

    //时间戳转化日期过滤器
    app.filter('formatTime', function () {
        return function (createTime) {
            var date = new Date(createTime);
            return formatDate('YYYY-MM-DD', date);
        }
    });

    //日期格式化方法
    function formatDate(pattern, date) {
        function formatNumber(data, format) { //3
            format = format.length;
            data = data || 0;
            return format == 1 ? data : (data = String(Math.pow(10, format) + data)).substr(data.length - format);
        }
        return pattern.replace(/([YMDhsm])\1*/g, function(format) {
            switch(format.charAt()) {
                case 'Y':
                    return formatNumber(date.getFullYear(), format);
                case 'M':
                    return formatNumber(date.getMonth() + 1, format);
                case 'D':
                    return formatNumber(date.getDate(), format);
                case 'w':
                    return date.getDay() + 1;
                case 'h':
                    return formatNumber(date.getHours(), format);
                case 'm':
                    return formatNumber(date.getMinutes(), format);
                case 's':
                    return formatNumber(date.getSeconds(), format);
            }
        });
    }


    $scope.getRule = function (hours, amount) {
        return "红色区域：在违停区域内，若" + hours + "小时未处理罚款" + amount + "元";
    }

    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var url = 'fine-rules?page=' + page + '&size=' + pageSize;
        if ($scope.region != null){
            url += '&region=' + $scope.region;
        }
        if ($scope.createTime != null){
            var date = new Date($scope.createTime);
            var dateFormat = formatDate('YYYY-MM-DD', date);
            url += '&createTime=' + dateFormat;
        }

        $http.get(url).success(function (data) {
            $scope.codes = data.data;
            $scope.totalServerItems = data.data.length;
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

    $scope.createFineRule = function () {
        var rtn = $modal.open({
            templateUrl: 'tpl/finerule/create_fine_rule.html',
            controller: 'createFineRuleController',
            resolve: {}
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '新增罚款规则成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    $scope.seeRowIndex = function (entity) {
        var rtn = $modal.open({
            templateUrl: 'tpl/finerule/see_fine_rule.html',
            controller: 'seeFineRuleController',
            resolve: {
                fineRule: function () {
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
            templateUrl: 'tpl/finerule/update_fine_rule.html',
            controller: 'updateFineRuleController',
            resolve: {
                fineRuleId: function () {
                    return id;
                }
            }
        });
        rtn.result.then(function (status) {
            if (status == 'SUCCESS') {
                $scope.pop('success', '', '修改罚款规则成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        }, function () {
        });
    }

    $scope.removeRowIndex = function (entity) {
        $http.delete('fine-rules/' + this.row.entity.id).success(function (data) {
            if (data.status == 'SUCCESS') {
                $scope.pop('success', '', '删除成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            } else {
                alert(data.error);
            }
        })
    }

    //日历工具事件
    $scope.timeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.createTimeOpened = true;
    }
    
}]);