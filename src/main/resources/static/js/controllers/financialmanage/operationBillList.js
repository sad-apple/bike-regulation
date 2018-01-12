/**
 * Created by zhaochuanzhi on 2017/8/4.
 */

'use strict';
app.controller('operationBillController', ['$scope', '$http', '$modal', 'toaster', function ($scope, $http, $modal, toaster) {

    $scope.id = "";
    $scope.operationOrgDetails = "";
    $scope.foundTime = "";
    $scope.operationOrg;
    $scope.totalCitys;
    $scope.totalProvinces;
    $scope.region = "";

    $scope.pop = function (type, title, text) {
        toaster.pop(type, title, text);
    };
    
    function init(){
        $http.get('operation-orgs/collection').success(function (data){
            var allTypes = {
                id : '0',
                name : '全部'
            };
            data.data.push(allTypes);
            $scope.operationOrg = data.data[data.data.length -1];
            $scope.operationOrgs = data.data;
            toasPop();
        }).error(function(err){
            alert(err.error);
        });

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
    
    function toasPop() {
        var content = "1.根据您的结算周期，CityBike会按时生成结算任务，并有1-3个工作日对其进行审核，审核通过后银行支付（遇节假日时间顺延)" +
            "2.如果对财务结算有任何疑问，请联系与您签约的业务经理或者客服0551-63857435。";
        $scope.pop('info', '温馨提示:', content);
    }
    
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
        data: 'operationBills',
        enablePaging: true,
        showFooter: true,
        rowHeight: 41,
        headerRowHeight: 36,
        multiSelect: false,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        columnDefs: [
            {field: 'id', displayName: '账单编号', width: '200px'},
            {field: 'operationOrgDetails.region', displayName: '所属区域', width: '200px', cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.operationOrgDetails.region| getRegionName }}</div>'},
            {field: 'operationOrgDetails.name', displayName: '所属组织名称', width: '200px'},
            {field: 'settlementAmoun', displayName: '结算金额', width: '200px', cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.settlementAmoun| getAmount }}</div>'},
            {field: 'settlementMethod', displayName: '结算方式', width: '200px'},
            {field: 'billStatus', displayName: '账单状态', width: '200px'},
            {field: 'foundTime', displayName: '账单时间', width: '200px', cellTemplate: '<div class="ngCellText ng-scope col8 colt8" >{{row.entity.foundTime| date:"yyyy-MM-dd"}}</div>'},
            {
                field: 'remove', displayName: '操作', width: "400px",
                cellTemplate: '<button ng-click="seeRowIndex(row.entity)" class="btn btn-info btn-sm m-t-xs m-l-xs" title="查看"  style="margin-top: 2px">查看</button>'
            }
        ]
    };

    /**
     * 将省市的id转换成省市的名称
     */
    app.filter('getRegionName',function(){
       return function(region){
           var provinceName;
           var cityName;
           if (!region || !region.length){return;} // 此判断防止第一次执行$digest循环时，会执行自定义的过滤器，则过滤器中还没有值的会报错
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
    });

    /**
     * 获得结算金额
     */
    app.filter('getAmount',function(){
       return function(settlementAmoun){
            return '￥'+ settlementAmoun;
       }

    });
    
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var url = 'operation-bills?page=' + page + '&size=' + pageSize;
        if ($scope.foundTime != "")
            url += "&foundTime=" + $scope.foundTime;
        if ($scope.region != "")
            url += "&region=" + $scope.region;
        if ($scope.operationOrg != "" && $scope.operationOrg != undefined)
            url += "&name=" + $scope.operationOrg.name;
        if ($scope.id != "")
            url += "&id=" + $scope.id;

        $http.get(url).success(function (pagedata) {
            $scope.operationBills = pagedata.data.content;
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

    $scope.$watch('operationOrg', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.search = function () {
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, '');
    }

    $scope.seeRowIndex = function (entity) {
        var id = entity.id;
        var rtn = $modal.open({
            templateUrl: 'tpl/financialmanage/see_operationBill.html',
            controller: 'seeOperationBillController',
            resolve: {
                operationBillId: function () {return id}
            }
        });
        rtn.result.then(function (status) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }, function () {
        });
    }
    
    $scope.timeTool = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.foundTimeOpened = true;
    };
    
}]);

