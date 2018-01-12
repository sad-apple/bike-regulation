/**
 * Created by zhaochuanzhi on 2017/8/7.
 */

'use strict';
app.controller('fineBillController', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {

    $scope.id = "";
    $scope.createTime = "";
    $scope.region = "";
    $scope.totalCitys;
    $scope.totalProvinces;

    function init(){
        $http.get('json/province.json').success(function (data) {
            $scope.totalProvinces = data;
        }).error(function(err){
            alert(err.error);
        });

        $http.get('json/city.json').success(function (data) {
            $scope.totalCitys = data;
        }).error(function(err){
            alert(err.error);
        });
    }

    init();

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
        data: 'fineBills',
        enablePaging: true,
        showFooter: true,
        rowHeight: 41,
        headerRowHeight: 36,
        multiSelect: false,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        columnDefs: [
            {field: 'id', displayName: '账单编号', width: '150px'},
            {field: 'fineAmount', displayName: '罚款金额', width: '200px', cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.fineAmount| getAmount}}</div>'},
            {field: 'operationOrgDetails.region', displayName: '所属区域', width: '200px', cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.operationOrgDetails.region| getRegionName }}</div>'},
            {field: 'bikeOwnerNumber', displayName: '所属车主', width: '200px'},
            {field: 'companyAmount', displayName: '公司内部应收款', width: '200px', cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.companyAmount| getAmount}}</div>'},
            {field: 'regulatorOrgAmount', displayName: '政府机构应收款', width: '200px', cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.regulatorOrgAmount| getAmount}}</div>'},
            {field: 'operationOrgAmount', displayName: '运营机构应收款', width: '200px', cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.operationOrgAmount| getAmount}}</div>'},
            {field: 'billStatus', displayName: '账单状态', width: '200px'},
            {field: 'createTime', displayName: '时间', width: '200px', cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.createTime| date:"yyyy-MM-dd"}}</div>'},
            {
                field: 'remove', displayName: '操作', width: "200px",
                cellTemplate: '<button ng-click="exportData(row.entity)" class="btn btn-info btn-sm m-t-xs m-l-xs" title="导出"  style="margin-top: 2px">导出</button>'
            }
        ]
    };

    /**
     * 将省市的id转换成省市的名称
     */
    app.filter('getRegionName',function(){
        return function(region) {
            var provinceName;
            var cityName;
            if (!region || !region.length) {return;} // 此判断防止第一次执行$digest循环时，会执行自定义的过滤器，则过滤器中还没有值的会报错
            return getRegion(region);
        }
    });

    // 返回省市的名称
    function getRegion(region){
        var provinceName;
        var cityName;
        for(var i = 0; i < $scope.totalProvinces.length; i++){
            if ($scope.totalProvinces[i].ProID == region[0]){
                provinceName =$scope.totalProvinces[i].name;
                break;
            }
        }
        for(var i = 0; i <  $scope.totalCitys.length; i++){
            if ( $scope.totalCitys[i].CityID == region[1]){
                cityName =  $scope.totalCitys[i].name;
                break;
            }
        }
        return (provinceName == cityName)? provinceName : (provinceName+cityName);
    }


    /**
     * 获得结算金额
     */
    app.filter('getAmount',function(){
        return function(amount){
            return '￥'+ amount;
        }

    });

    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var url = 'fine-bills?page=' + page + '&size=' + pageSize;
        if ($scope.createTime != "")
            url += "&createTime=" + $scope.createTime;
        if ($scope.region != "" && $scope.region != undefined)
            url += "&region=" + $scope.region;
        if ($scope.id != "")
            url += "&id=" + $scope.id;

        $http.get(url).success(function (pagedata) {
            $scope.fineBills = pagedata.data.content;
            $scope.totalServerItems = pagedata.data.totalElements;
        }).error(function (err) {
            alert(err.error);
        });
    };

    // 将数据导出到excel中
    var myStyle = {
        headers: true,
        caption: {
            title:'罚款账单'
        },
        column: {
            style:'font-size:15px'
        },
        columns: [
            {columnid:'id',title: '账单编号',width:'100px'},
            {columnid:'fineAmount', title: '罚款金额', width:'100px', cell: {value: function(value){return '￥'+value}}},
            {columnid:'operationOrgDetails', title:'所属区域', width:'150px', cell: {value: function(value){return getRegion(value.region)}}},
            {columnid:'bikeOwnerNumber', title:'所属车主', width:'150px'},
            {columnid:'companyAmount', title:'公司内部应收款', width:'150px', cell: {value: function(value){return '￥'+value}}},
            {columnid:'regulatorOrgAmount', title:'政府机构应收款', width:'150px', cell: {value: function(value){return '￥'+value}}},
            {columnid:'operationOrgAmount', title:'运营机构应收款', width:'150px', cell: {value: function(value){return '￥'+value}}},
            {columnid:'billStatus', title:'账单状态', width:'100px'},
            {columnid:'createTime', title:'时间', width:'100px', cell: {value: function(value){return dateTime(value)}}}
        ],
    };

    // 获得要导出到excel中的数据
    $scope.exportData = function (param){
        if (param == 'all') { // 全部导出导出到excel表中
            var url = 'fine-bills/collection?1=1';
            if ($scope.createTime != "")
                url += "&createTime=" + $scope.createTime;
            if ($scope.region != "" )
                url += "&region=" + $scope.region;
            if ($scope.id != "")
                url += "&id=" + $scope.id;

            $http.get(url).success(function (data) {
                $scope.billDatas = data.data;
            }).error(function (err) {
                alert(err.error);
            });
            alasql('SELECT * INTO XLS("罚款账单.xls",?) FROM ?', [myStyle,  $scope.billDatas]);
        } else {
            var array = new Array();
            array.push(param);
            alasql('SELECT * INTO XLS("罚款账单.xls",?) FROM ?', [myStyle, array]); // 单个导出到excel表中
        }
    };

    // 将时间戳转换为标准时间在excel表中呈现
    function dateTime(data){
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var date = new Date(data);
        return date.getFullYear()+'-'+months[date.getMonth()]+'-'+date.getDate();
    }

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

    $scope.startTimeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startTimeOpened = true;
    };

    $scope.endTimeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endTimeOpened = true;
    };

}]);