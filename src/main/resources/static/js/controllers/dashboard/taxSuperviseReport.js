/**
 * Created by lihao on 2017/8/16.
 */

'use strict';

app.controller('taxSuperviseReport', ['$scope', function ($scope) {

    var now = new Date();
    var y = ['A公司', 'B公司', 'C公司', 'D公司'];
    var interval = 2000;
    var dateInterval = 1000;
    var lineData = [
        [1600, 1700, 2200, 2300, 2400, 2600, 3300],
        [500, 800, 1200, 1400, 1600, 1700, 1800],
        [800, 1000, 1100, 1200, 1400, 1800, 2300],
        [1200, 1500, 1800, 1900, 2200, 2300, 2800]
    ];

    $scope.taxData = [
        {
            id: "10000",
            bikeId: "12321",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "800",
            operationOrg: "A公司",
            payTax: "420",
            taxRate: "20%",
            totalEarn: "2100",
            payment: "支付宝",
            region: "蜀山区",
            taxOrg: "蜀山区地税"
        },
        {
            id: "10001",
            bikeId: "22322",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1200",
            operationOrg: "B公司",
            payTax: "250",
            taxRate: "10%",
            totalEarn: "2500",
            payment: "微信",
            region: "包河区",
            taxOrg: "包河区地税"
        },
        {
            id: "10002",
            bikeId: "22323",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "500",
            operationOrg: "B公司",
            payTax: "300",
            taxRate: "10%",
            totalEarn: "3000",
            payment: "支付宝",
            region: "新站区",
            taxOrg: "新站区地税"
        },
        {
            id: "10003",
            bikeId: "32324",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1500",
            operationOrg: "C公司",
            payTax: "440",
            taxRate: "20%",
            totalEarn: "2200",
            payment: "支付宝",
            region: "蜀山区",
            taxOrg: "蜀山区地税"
        },
        {
            id: "10004",
            bikeId: "12325",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "500",
            operationOrg: "A公司",
            payTax: "250",
            taxRate: "10%",
            totalEarn: "2500",
            payment: "微信",
            region: "经开区",
            taxOrg: "经开区地税"
        },
        {
            id: "10005",
            bikeId: "32326",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1400",
            operationOrg: "C公司",
            payTax: "210",
            taxRate: "10%",
            totalEarn: "2100",
            payment: "微信",
            region: "高新区",
            taxOrg: "高新区地税"
        },
        {
            id: "10006",
            bikeId: "42327",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1200",
            operationOrg: "D公司",
            payTax: "250",
            taxRate: "10%",
            totalEarn: "2500",
            payment: "支付宝",
            region: "瑶海区",
            taxOrg: "瑶海区地税"
        },
        {
            id: "10007",
            bikeId: "42328",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1100",
            operationOrg: "D公司",
            payTax: "600",
            taxRate: "20%",
            totalEarn: "3000",
            payment: "微信",
            region: "政务区",
            taxOrg: "政务区地税"
        },
        {
            id: "10008",
            bikeId: "42329",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1000",
            operationOrg: "D公司",
            payTax: "260",
            taxRate: "10%",
            totalEarn: "2600",
            payment: "支付宝",
            region: "滨湖区",
            taxOrg: "滨湖区地税"
        },
        {
            id: "10009",
            bikeId: "12330",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "600",
            operationOrg: "A公司",
            payTax: "220",
            taxRate: "10%",
            totalEarn: "2200",
            payment: "微信",
            region: "庐阳区",
            taxOrg: "庐阳区地税"
        },
        {
            id: "10010",
            bikeId: "22331",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "700",
            operationOrg: "B公司",
            payTax: "340",
            taxRate: "20%",
            totalEarn: "1700",
            payment: "支付宝",
            region: "蜀山区",
            taxOrg: "蜀山区地税"
        },
        {
            id: "10012",
            bikeId: "32332",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "900",
            operationOrg: "C公司",
            payTax: "500",
            taxRate: "20%",
            totalEarn: "2500",
            payment: "微信",
            region: "包河区",
            taxOrg: "包河区地税"
        },
        {
            id: "10011",
            bikeId: "32333",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "1400",
            operationOrg: "C公司",
            payTax: "310",
            taxRate: "10%",
            totalEarn: "3100",
            payment: "支付宝",
            region: "新站区",
            taxOrg: "新站区地税"
        },
        {
            id: "10013",
            bikeId: "42334",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "1200",
            operationOrg: "D公司",
            payTax: "460",
            taxRate: "20%",
            totalEarn: "2300",
            payment: "微信",
            region: "经开区",
            taxOrg: "经开区地税"
        },
        {
            id: "10014",
            bikeId: "12335",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "1300",
            operationOrg: "A公司",
            payTax: "280",
            taxRate: "10%",
            totalEarn: "2800",
            payment: "支付宝",
            region: "高新区",
            taxOrg: "高新区地税"
        },
        {
            id: "10015",
            bikeId: "22336",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "600",
            operationOrg: "B公司",
            payTax: "580",
            taxRate: "20%",
            totalEarn: "2900",
            payment: "支付宝",
            region: "高新区",
            taxOrg: "高新区地税"
        },
        {
            id: "10016",
            bikeId: "22337",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1500",
            operationOrg: "B公司",
            payTax: "260",
            taxRate: "10%",
            totalEarn: "2600",
            payment: "微信",
            region: "政务区",
            taxOrg: "政务区地税"
        },
        {
            id: "10017",
            bikeId: "32338",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "1600",
            operationOrg: "C公司",
            payTax: "240",
            taxRate: "10%",
            totalEarn: "2400",
            payment: "微信",
            region: "瑶海区",
            taxOrg: "瑶海区地税"
        },
        {
            id: "10018",
            bikeId: "42339",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "900",
            operationOrg: "D公司",
            payTax: "220",
            taxRate: "10%",
            totalEarn: "2200",
            payment: "支付宝",
            region: "滨湖区",
            taxOrg: "滨湖区地税"
        },
        {
            id: "10000",
            bikeId: "12321",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "800",
            operationOrg: "A公司",
            payTax: "420",
            taxRate: "20%",
            totalEarn: "2100",
            payment: "支付宝",
            region: "蜀山区",
            taxOrg: "蜀山区地税"
        },
        {
            id: "10001",
            bikeId: "22322",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1200",
            operationOrg: "B公司",
            payTax: "250",
            taxRate: "10%",
            totalEarn: "2500",
            payment: "微信",
            region: "包河区",
            taxOrg: "包河区地税"
        },
        {
            id: "10002",
            bikeId: "22323",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "500",
            operationOrg: "B公司",
            payTax: "300",
            taxRate: "10%",
            totalEarn: "3000",
            payment: "支付宝",
            region: "新站区",
            taxOrg: "新站区地税"
        },
        {
            id: "10003",
            bikeId: "32324",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1500",
            operationOrg: "C公司",
            payTax: "440",
            taxRate: "20%",
            totalEarn: "2200",
            payment: "支付宝",
            region: "蜀山区",
            taxOrg: "蜀山区地税"
        },
        {
            id: "10004",
            bikeId: "12325",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "500",
            operationOrg: "A公司",
            payTax: "250",
            taxRate: "10%",
            totalEarn: "2500",
            payment: "微信",
            region: "经开区",
            taxOrg: "经开区地税"
        },
        {
            id: "10005",
            bikeId: "32326",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1400",
            operationOrg: "C公司",
            payTax: "210",
            taxRate: "10%",
            totalEarn: "2100",
            payment: "微信",
            region: "高新区",
            taxOrg: "高新区地税"
        },
        {
            id: "10006",
            bikeId: "42327",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1200",
            operationOrg: "D公司",
            payTax: "250",
            taxRate: "10%",
            totalEarn: "2500",
            payment: "支付宝",
            region: "瑶海区",
            taxOrg: "瑶海区地税"
        },
        {
            id: "10007",
            bikeId: "42328",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1100",
            operationOrg: "D公司",
            payTax: "600",
            taxRate: "20%",
            totalEarn: "3000",
            payment: "微信",
            region: "政务区",
            taxOrg: "政务区地税"
        },
        {
            id: "10008",
            bikeId: "42329",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1000",
            operationOrg: "D公司",
            payTax: "260",
            taxRate: "10%",
            totalEarn: "2600",
            payment: "支付宝",
            region: "滨湖区",
            taxOrg: "滨湖区地税"
        },
        {
            id: "10009",
            bikeId: "12330",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "600",
            operationOrg: "A公司",
            payTax: "220",
            taxRate: "10%",
            totalEarn: "2200",
            payment: "微信",
            region: "庐阳区",
            taxOrg: "庐阳区地税"
        },
        {
            id: "10010",
            bikeId: "22331",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "700",
            operationOrg: "B公司",
            payTax: "340",
            taxRate: "20%",
            totalEarn: "1700",
            payment: "支付宝",
            region: "蜀山区",
            taxOrg: "蜀山区地税"
        },
        {
            id: "10012",
            bikeId: "32332",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "900",
            operationOrg: "C公司",
            payTax: "500",
            taxRate: "20%",
            totalEarn: "2500",
            payment: "微信",
            region: "包河区",
            taxOrg: "包河区地税"
        },
        {
            id: "10011",
            bikeId: "32333",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "1400",
            operationOrg: "C公司",
            payTax: "310",
            taxRate: "10%",
            totalEarn: "3100",
            payment: "支付宝",
            region: "新站区",
            taxOrg: "新站区地税"
        },
        {
            id: "10013",
            bikeId: "42334",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "1200",
            operationOrg: "D公司",
            payTax: "460",
            taxRate: "20%",
            totalEarn: "2300",
            payment: "微信",
            region: "经开区",
            taxOrg: "经开区地税"
        },
        {
            id: "10014",
            bikeId: "12335",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "1300",
            operationOrg: "A公司",
            payTax: "280",
            taxRate: "10%",
            totalEarn: "2800",
            payment: "支付宝",
            region: "高新区",
            taxOrg: "高新区地税"
        },
        {
            id: "10015",
            bikeId: "22336",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "600",
            operationOrg: "B公司",
            payTax: "580",
            taxRate: "20%",
            totalEarn: "2900",
            payment: "支付宝",
            region: "高新区",
            taxOrg: "高新区地税"
        },
        {
            id: "10016",
            bikeId: "22337",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "1500",
            operationOrg: "B公司",
            payTax: "260",
            taxRate: "10%",
            totalEarn: "2600",
            payment: "微信",
            region: "政务区",
            taxOrg: "政务区地税"
        },
        {
            id: "10017",
            bikeId: "32338",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥1",
            distance: "1600",
            operationOrg: "C公司",
            payTax: "240",
            taxRate: "10%",
            totalEarn: "2400",
            payment: "微信",
            region: "瑶海区",
            taxOrg: "瑶海区地税"
        },
        {
            id: "10018",
            bikeId: "42339",
            createTime: "2017-08-16 15:31:04",
            currentEarn: "￥2",
            distance: "900",
            operationOrg: "D公司",
            payTax: "220",
            taxRate: "10%",
            totalEarn: "2200",
            payment: "支付宝",
            region: "滨湖区",
            taxOrg: "滨湖区地税"
        }
    ];
    $scope.createTime = formatDate("YYYY-MM-DD", new Date());
    $scope.theme = 'default';
    $scope.maxDate = now;
    $scope.totalTax = Math.round(Math.random()*200000 + 6000000);

    var data1 = getRandomArr(0);
    var data2 = getRandomArr(1);
    var data3 = getRandomArr(2);
    var data4 = getRandomArr(3);

    function init() {
        $scope.categories = [];
        $scope.totals = [];
        $scope.increments = [];

        areaTaxChart();
        timeTaxChart();
        for (var i = 0; i < $scope.taxData.length; i++) {
            decorateData($scope.taxData[i]);
            $scope.taxData[i].createTime = new Date(+new Date() - ($scope.taxData.length - i) * dateInterval);
        };
        tableScrollFun();
    }

    init();

    // ngGrid初始化数据
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };

    $scope.gridOptions = {
        data: 'taxData',
        enablePaging: false,
        rowHeight: 41,
        headerRowHeight: 36,
        multiSelect: false,
        columnDefs: [
            {field: 'id', displayName: '账单编号', width: '150px'},
            {field: 'bikeId', displayName: '单车编号', width: '150px'},
            {field: 'region', displayName: '区域', width: '150px'},
            {field: 'operationOrg', displayName: '运营方', width: '150px'},
            {
                field: 'createTime',
                displayName: '时间',
                width: '200px',
                cellTemplate: '<div class="ngCellText ng-scope col4 colt4" >{{row.entity.createTime | formatTime}}</div>'
            },
            {
                field: 'distance',
                displayName: '行驶距离',
                width: '150px',
                cellTemplate: '<div class="ngCellText ng-scope col3 colt3" >{{row.entity.distance | formatDistance}}</div>'
            },
            {field: 'currentEarn', displayName: '本次收益', width: '150px'},
            {field: 'payment', displayName: '付款方式', width: '150px'},
            {field: 'taxOrg', displayName: '税收机构', width: '150px'},
            {
                field: 'totalEarn',
                displayName: '收益总额',
                width: '150px',
                cellTemplate: '<div class="ngCellText ng-scope col3 colt3" >{{row.entity.totalEarn | formatAmount}}</div>'
            },
            {field: 'taxRate', displayName: '税率', width: '150px'},
            {
                field: 'payTax',
                displayName: '应交税费',
                width: '150px',
                cellTemplate: '<div class="ngCellText ng-scope col3 colt3" >{{row.entity.payTax | formatAmount}}</div>'
            }
        ]
    };

    // 金额过滤器
    app.filter('formatAmount', function () {
        return function (amount) {
            return '￥' + amount;
        }
    });

    //行驶距离过滤
    app.filter('formatDistance', function () {
        return function (distance) {
            var formatDistance;
            if (distance < 1000) {
                formatDistance = distance + "m";
            } else {
                formatDistance = Math.round((distance / 1000) * 10) / 10 + "km";
            }
            return formatDistance;
        }
    });

    // 时间戳转化日期过滤器
    app.filter('formatTime', function () {
        return function (createTime) {
            var date = new Date(createTime);
            return formatDate('YYYY-MM-DD hh:mm:ss', date);
        }
    });

    // 数据修饰
    function decorateData(param) {
        param.createTime = new Date();
        param.id = formatDate("YYMMDD", now) + "1" + param.id;
        param.bikeId = '0551' + param.bikeId;
    }

    //日期格式化方法
    function formatDate(pattern, date) {
        function formatNumber(data, format) {
            format = format.length;
            data = data || 0;
            return format == 1 ? data : (data = String(Math.pow(10, format) + data)).substr(data.length - format);
        }

        return pattern.replace(/([YMDhsm])\1*/g, function (format) {
            switch (format.charAt()) {
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

    function timeTaxChart() {
        var option = {
            title: {
                text: '税收数据',
                subtext: '——————————',
                itemGap: 0,
                padding: [0, 0, 0, 30],
                textStyle: {
                    color: '#DCDCDC'
                },
                subtextStyle: {
                    color: '#008C9E',
                    verticalAlign: 'top',
                    fontSize: 22
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                padding: [0, 0, 0, 30],
                left: 'left',
                textStyle: {
                    color: '#DCDCDC'
                },
                top: '10%',
                data: ['A单车', 'B单车', 'C单车', 'D单车']
            },
            grid: {
                left: '3%',
                right: '1%',
                top: '30%',
                containLabel: true
            },
            xAxis: [
                {
                    name: '（时间）',
                    type: 'time',
                    axisLine: {
                        lineStyle: {
                            color: '#ffffff',
                            type: 'solid'  // 设置坐标轴线为实线
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#ffffff'
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff' // x坐标的文字颜色
                        }
                    }
                }
            ],
            yAxis: [
                {
                    name: '（金额）',
                    nameTextStyle: {
                        color: '#ffffff'
                    },
                    type: 'value',
                    min: 0,
                    splitLine: {
                        lineStyle: {
                            borderColor: '#6a7985',
                            type: 'solid'  // 设置坐标轴线为实线
                        }
                    },
                    axisLine: {
                        show: false     // 隐藏y轴
                    },
                    axisTick: {
                        show: false  // 隐藏y轴坐标出头
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff'    // y坐标的文字颜色
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'A单车',
                    type: 'line',
                    symbolSize: 16,  // 拐点大小
                    itemStyle: {
                        normal: {
                            width: 3,
                            color: 'rgb(255,23,109)'    // 折线颜色
                        }
                    },
                    data: data1
                }, {
                    name: 'B单车',
                    type: 'line',
                    symbolSize: 16,  // 拐点大小
                    itemStyle: {
                        normal: {
                            width: 3,
                            color: 'rgb(255,227,23)'    // 折线颜色
                        }
                    },
                    data: data2
                }, {
                    name: 'C单车',
                    type: 'line',
                    symbolSize: 16,
                    itemStyle: {
                        normal: {
                            width: 3,
                            color: 'rgb(37,208,255)'
                        }
                    },
                    data: data3
                }, {
                    name: 'D单车',
                    type: 'line',
                    symbolSize: 16,
                    itemStyle: {
                        normal: {
                            width: 3,
                            color: 'rgb(37,255,51)'
                        }
                    },
                    data: data4
                }
            ]
        };

        var myChart = echarts.init(document.getElementById('timeTaxChartConfig'));
        myChart.setOption(option);

        window.addEventListener("resize",function(){
            myChart.resize();
        });

        setInterval(function () {
            var min = 1000000;
            var x = new Date(), // current time
                series = myChart.getOption().series,
                yAxis = myChart.getOption().yAxis;
            for (var i = 0; i < y.length; i++) {
                var temp = series[i].data[series[i].data.length - 1].value[1];
                series[i].data.shift();
                series[i].data.push({name: x.toString(), value: [x, temp + Math.round(Math.random() * 500)]});
            }

            angular.forEach(series, function (data) {
                for (var i = 0; i <data.data.length; i++){
                    if (min >= data.data[i].value[1]){
                        min =  data.data[i].value[1];
                    }
                }
            });

            yAxis[0].min = min - 500;
            myChart.setOption({
                series: series,
                yAxis: yAxis
            });
        }, interval);
    }

    //获取初始化数据数组
    function getRandomArr(type) {
        var data = [];
        for (var i = 0; i < 7; i++) {
            data.unshift(randomData(i, type));
        }
        return data;
    }

    function randomData(count, type) {
        var now1 = new Date(+now - count * (interval));
        return {
            name: now1.toString(),
            value: [
                now1,
                lineData[type][lineData[type].length - 1 - count]
            ]
        }
    }

    function getNumber() {
        return Math.round(Math.random() * 1000 + 7000);
    }

    function areaTaxChart() {
        var categories = ['蜀山区', '经开区', '包河区', '庐阳区', '瑶海区', '政务区', '高新区', '新站区', '滨湖区'];
        var totalTax = [{value: getNumber(), name: "蜀山区"}, {value: getNumber(), name: "经开区"}, {
            value: getNumber(),
            name: "包河区"
        }, {value: getNumber(), name: "庐阳区"}, {value: getNumber(), name: "瑶海区"}, {
            value: getNumber(),
            name: "政务区"
        }, {value: getNumber(), name: "高新区"}, {value: getNumber(), name: "新站区"}, {value: getNumber(), name: "滨湖区"}];

        var option = {
            title: {
                text: '区域税收统计',
                subtext: '——————————',
                itemGap: 0,
                padding: [0, 0, 0, 30],
                textStyle: {
                    color: '#DCDCDC'
                },
                subtextStyle: {
                    color: '#008C9E',
                    verticalAlign: 'top',
                    fontSize: 22
                },
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}元 ({d}%)"
            },
            legend: {
                padding: [0, 0, 0, 30],
                left: 'center',
                textStyle: {
                    color: '#DCDCDC'
                },
                itemWidth: 10,
                itemHeight: 10,
                borderRadius: 10,
                top: '10%',
                data: categories
            },
            series: [
                {
                    name: '税收统计',
                    type: 'pie',
                    label: {
                        normal: {
                            show: true,
                            align: 'left',
                            color: "#ff0000",
                            fontSize: 8,
                            formatter: function (params) {
                                return  params.value + "元";
                            },
                            position: 'inner'
                        }
                    },
                    radius: ['30%', '80%'],
                    center: ['50%', '55%'],
                    data: totalTax,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        var myChart = echarts.init(document.getElementById('areaTaxChartConfig'));
        myChart.setOption(option);

        window.addEventListener("resize",function(){
            myChart.resize();
        });

        // 随着时间的改变获取不同的值
        $scope.$watch('createTime', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                myChart.dispose();
                areaTaxChart();
            }
        }, true);
    }

    //日历工具事件
    $scope.timeTool = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.createTimeOpened = true;
    }
}]);
