'use strict';

app.controller('depositRuleList', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {

    $scope.region;
    
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
            { field: 'id', displayName: '序号', width:'150px' },
            { field: 'region', displayName: '所属区域', width:'150px' },
            { field: 'depositStauts', displayName: '是否需要押金', width:'150px',cellTemplate: '<div class="ngCellText ng-scope col7 colt7" >{{row.entity.depositStatus == 0 ? "是" : "否" }}</div>' },
            { field: 'idCardNumber', displayName: '身份证号', width:'150px' },
            { field: 'depositAmount', displayName: '押金金额', width:'150px' },
            { field: 'payeeName', displayName: '收款人姓名', width:'150px' },
            { field: 'payeeAccount', displayName: '收款人账户', width:'150px' },
            { field: 'remove', displayName: '操作', width: "400px",
             cellTemplate: '<button class="btn btn-primary btn-sm m-t-xs m-l-xs" title="编辑" style="margin-top: 2px" ng-click="editRowIndex(row.entity)">编辑</button>' +
              '<button class="btn btn-info btn-sm m-t-xs m-l-xs" title="详情"  style="margin-top: 2px" ng-click="seeRowIndex(row.entity)">详情</button>' +
              '<button class="btn btn-danger btn-sm m-t-xs m-l-xs" style="margin-top: 2px" confirm-button-type="danger" mwl-confirm message="确定删除?" title="删除" confirm-text="确定" cancel-text="取消" on-confirm="removeRowIndex(row.entity)">删除</button>'
            }
        ]
    };

    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var url = 'deposit-rules?page=' + page + '&size=' + pageSize ;
        if ($scope.region != null){
            url += '&region=' + $scope.region;
        }
        
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

    $scope.search = function(){
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, '');
    }

    $scope.seeRowIndex = function(entity){
        var rtn = $modal.open({
            templateUrl: 'tpl/depositrule/see_deposit_rule.html',
            controller: 'seeDepositRuleController',
            resolve:{
                depositRule : function (){ return entity }
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
            templateUrl: 'tpl/depositrule/update_deposit_rule.html',
            controller: 'updateDepositRuleController',
            resolve:{
                depositRuleId:function(){return id;}
            }
        });
        rtn.result.then(function (status) {
            if(status == 'SUCCESS') {
                $scope.pop('success', '', '修改押金规则成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        },function(){
        });
    };

    /**
     * 创建押金规则
     */
    $scope.createDepositRule = function(){
        var rtn = $modal.open({
            templateUrl: 'tpl/depositrule/create_deposit_rule.html',
            controller: 'createDepositRuleController',
            resolve:{
            }
        });
        rtn.result.then(function (status) {
            if(status == 'SUCCESS') {
                $scope.pop('success', '', '新增押金规则成功');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }
        },function(){
        });
    };

    /**
     * 删除押金规则
     * @param entity
     */
    $scope.removeRowIndex = function(entity){
        $http.delete('deposit-rules/'+this.row.entity.id).success(function(data) {
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