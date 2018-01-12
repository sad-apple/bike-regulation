/**
 * Created by shuzhengxing on 2017/8/8.
 */
'use strict';

app.controller('illegalListController', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {
    $scope.status = "";
    $scope.time = "";
    $scope.plateNumber = "";
    $scope.bikeType = "";

    //提示信息
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };

    $scope.pop = function(type,title,text){
        toaster.pop(type,'',text);
    };

    function init(){
        $http.get('illegal-auditing/fault-status').success(function (data){
            var allStatuses = {
                id : '0',
                status : '全部'
            };
            data.data.push(allStatuses);
            $scope.status = data.data[data.data.length -1];
            $scope.allStatus = data.data;
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
        pageSize: '10',
        currentPage: 1
    };

    $scope.gridOptions = {
        data: 'illegallyParked',
        enablePaging: true,
        showFooter: true,
        rowHeight: 50,
        headerRowHeight: 36,
        multiSelect: false,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        columnDefs: [
            // { field: 'id', displayName: '序号', width:'180px', cellTemplate:'<div>{{row.index}}</div>'},
            { field: 'bikeType.name', displayName: '车辆类型名称', width:'180px'  },
            { field: 'bikeType.file.name', displayName: '车标图片', width:'90px', cellTemplate: '<img ng-src="{{\'files/file/\' + row.entity.bikeType.file.id}}" style="width:90px; height:50px">' },
            { field: 'plateNumber', displayName: '单车编号', width:'180px'  },
            { field: 'illegallyImage', displayName: '违停图片', width:'90px', cellTemplate: '<img ng-src="{{\'files/file/\' + row.entity.file.id}}" style="width:90px; height:50px">'  },
            { field: 'remark', displayName: '备注', width:'180px'  },
            { field: 'faultStatus.status', displayName: '状态', width:'180px' },
            { field: 'time', displayName: '举报时间', width:'180px',cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.time | date:"yyyy-MM-dd"}}</div>' },
            { field: 'remove', displayName: '操作', width: "300px",
                cellTemplate: '<button class="btn btn-primary btn-sm m-t-xs m-l-xs" title="详情" style="margin-top: 2px" ng-click="seeRowIndex(row.entity)">详情</button>' +
                '<button ng-click="determine(row.entity)" class="btn btn-info btn-sm m-t-xs m-l-xs" title="确定"  style="margin-top: 2px">确定</button>' +
                '<button ng-click="cancel(row.entity)" class="btn btn-danger btn-sm m-t-xs m-l-xs" title="取消"  style="margin-top: 2px">取消</button>'
            }
        ]
    };

    $scope.getPagedDataAsync = function (pageSize, page) {
        var url = 'illegal-auditing?page=' + page + '&size=' + pageSize ;
        url = ($scope.status != "") ? (url + '&faultStatus=' + $scope.status.status) : url;

        if($scope.time != "" && $scope.time != null){
            var d = new Date($scope.time);
            var getMonth = (d.getMonth() + 1) < 10 ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1);
            var getDate = d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate();
            $scope.date = d.getFullYear() + '-' + getMonth + '-' + getDate;
            url = url + '&time=' + $scope.date;
        }

        url = ($scope.plateNumber != "") ? (url + '&plateNumber=' + $scope.plateNumber) : url;

        url = ($scope.bikeType != "") ? (url + '&bikeType=' + $scope.bikeType) : url;

        $http.get(url).success(function (pagedata) {
            $scope.illegallyParked = pagedata.data.content;
            $scope.totalServerItems = pagedata.data.totalElements;
        }).error(function (err) {
            alert(err.error);
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

    $scope.$watch('status', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    $scope.$watch('time', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }, true);

    //按条件进行搜索
    $scope.search = function(){
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    };

    //查看违停审核车辆详细信息
    $scope.seeRowIndex = function(entity){
        var rtn = $modal.open({
            templateUrl: 'tpl/illegalAuditing/see_illegal.html',
            controller: 'seeIllegalController',
            resolve:{
                IllegallyParked : function (){ return entity }
            }
        });
        rtn.result.then(function (status) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        },function(){
        });
    };

    //故障审核车辆状态改为确定
    $scope.determine = function(entity) {
        if(this.row.entity.faultStatus.id == "2"){
            $scope.pop('error', '', '不可重复修改！');
        }else {
            $http.put('illegal-auditing/determine/' + this.row.entity.id, this.row.entity).success(function (data) {
                $scope.pop('success', '', '修改成功！');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }).error(function (err) {
                alert(err.error);
            })
        }
    };

    //故障审核车辆状态改为取消
    $scope.cancel = function(entity){
        if(this.row.entity.faultStatus.id == "3"){
            $scope.pop('error', '', '不可重复修改！');
        }else {
            $http.put('illegal-auditing/cancel/' + this.row.entity.id, this.row.entity).success(function (data) {
                $scope.pop('success', '', '修改成功！');
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }).error(function (err) {
                alert(err.error);
            })
        }
    };

    $scope.timeTool = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.factoryDateOpened = true;
    };

}])
;
