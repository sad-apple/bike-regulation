/**
 * Created by lihao on 2017/8/25.
 */

'use strict';

app.controller('carTaxSupervise', ['$scope', function ($scope) {

    var now = new Date();
    var y = ['A公司', 'B公司', 'C公司'];
    var interval = 2000;
    var lineData = [
        [1000, 1200, 1300, 1800, 2300, 2500, 2800],
        [2000, 2300, 2400, 2600, 2800, 3400, 3800],
        [3000, 3500, 3600, 3800, 4000, 4300, 4500]
    ];
    var data1 = getRandomArr(0);
    var data2 = getRandomArr(1);
    var data3 = getRandomArr(2);
    var intervalfun;

    // 虚拟数据源
    $scope.codes = [
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10001, "plate": "皖A7***6", "region": "蜀山区", "operationOrg": "快车", "createTime": new Date(), "distance": "10km", "hourLong": 10, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10002, "plate": "皖B6***7", "region": "高新区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "13km", "hourLong": 12, "currentEarn": "￥5", "payment": "微信", "taxOrg": "高新区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10003, "plate": "皖C5***9", "region": "经开区", "operationOrg": "快车", "createTime": new Date(), "distance": "40km", "hourLong": 36, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "经开区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10004, "plate": "皖D2***5", "region": "包河区", "operationOrg": "快车", "createTime": new Date(), "distance": "28km", "hourLong": 25, "currentEarn": "￥5", "payment": "微信", "taxOrg": "包河区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10005, "plate": "皖N7***4", "region": "政务区", "operationOrg": "快车", "createTime": new Date(), "distance": "12km", "hourLong": 10, "currentEarn": "￥5", "payment": "微信", "taxOrg": "政务区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10006, "plate": "皖M8***2", "region": "瑶海区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "16km", "hourLong": 14, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "瑶海区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10007, "plate": "皖L9***8", "region": "新站区", "operationOrg": "快车", "createTime": new Date(), "distance": "22km", "hourLong": 20, "currentEarn": "￥5", "payment": "微信", "taxOrg": "新站区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10008, "plate": "皖S6***7", "region": "滨湖区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "24km", "hourLong": 22, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "滨湖区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10009, "plate": "皖C3***5", "region": "蜀山区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "13km", "hourLong": 15, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10010, "plate": "皖A2***9", "region": "高新区", "operationOrg": "快车", "createTime": new Date(), "distance": "16km", "hourLong": 14, "currentEarn": "￥5", "payment": "微信", "taxOrg": "高新区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10011, "plate": "皖P6***6", "region": "包河区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "18km", "hourLong": 20, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "包河区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10012, "plate": "皖A5***3", "region": "政务区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "19km", "hourLong": 18, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "政务区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10013, "plate": "皖A4***5", "region": "瑶海区", "operationOrg": "快车", "createTime": new Date(), "distance": "25km", "hourLong": 20, "currentEarn": "￥5", "payment": "微信", "taxOrg": "瑶海区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10014, "plate": "皖B8***2", "region": "蜀山区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "17km", "hourLong": 19, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10015, "plate": "皖D9***8", "region": "庐阳区", "operationOrg": "快车", "createTime": new Date(), "distance": "22km", "hourLong": 25, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "庐阳区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10016, "plate": "皖C6***7", "region": "蜀山区", "operationOrg": "快车", "createTime": new Date(), "distance": "22km", "hourLong": 19, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10017, "plate": "皖M3***3", "region": "蜀山区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "32km", "hourLong": 28, "currentEarn": "￥5", "payment": "微信", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10018, "plate": "皖N7***8", "region": "经开区", "operationOrg": "快车", "createTime": new Date(), "distance": "35km", "hourLong": 28, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "经开区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10019, "plate": "皖L4***4", "region": "蜀山区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "23km", "hourLong": 20, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10020, "plate": "皖P4***9", "region": "蜀山区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "36km", "hourLong": 29, "currentEarn": "￥5", "payment": "微信", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10021, "plate": "皖A3***6", "region": "瑶海区", "operationOrg": "快车", "createTime": new Date(), "distance": "26km", "hourLong": 25, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "瑶海区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10022, "plate": "皖C2***5", "region": "滨湖区", "operationOrg": "快车", "createTime": new Date(), "distance": "28km", "hourLong": 25, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "滨湖区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10023, "plate": "皖D6***7", "region": "滨湖区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "26km", "hourLong": 24, "currentEarn": "￥5", "payment": "微信", "taxOrg": "滨湖区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10024, "plate": "皖B5***4", "region": "政务区", "operationOrg": "快车", "createTime": new Date(), "distance": "30km", "hourLong": 25, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "政务区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10025, "plate": "皖M8***3", "region": "蜀山区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "16km", "hourLong": 15, "currentEarn": "￥5", "payment": "微信", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10026, "plate": "皖N7***8", "region": "政务区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "18km", "hourLong": 17, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "政务区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10027, "plate": "皖C2***9", "region": "蜀山区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "12km", "hourLong": 10, "currentEarn": "￥5", "payment": "微信", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10028, "plate": "皖L3***6", "region": "政务区", "operationOrg": "快车", "createTime": new Date(), "distance": "21km", "hourLong": 18, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "政务区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10029, "plate": "皖S9***4", "region": "蜀山区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "20km", "hourLong": 18, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10030, "plate": "皖H8***2", "region": "新站区", "operationOrg": "快车", "createTime": new Date(), "distance": "18km", "hourLong": 16, "currentEarn": "￥5", "payment": "微信", "taxOrg": "新站区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10031, "plate": "皖A7***7", "region": "新站区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "17km", "hourLong": 18, "currentEarn": "￥5", "payment": "支付宝", "taxOrg": "新站区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"},
        {"id": formatDate('YYMMDD', new Date()) + "1" + 10032, "plate": "皖A5***8", "region": "蜀山区", "operationOrg": "顺风车", "createTime": new Date(), "distance": "20km", "hourLong": 23, "currentEarn": "￥5", "payment": "微信", "taxOrg": "蜀山区地税", "totalEarn": "￥5", "taxRate": "3.0%", "payTax": "￥5"}
    ];

    areaTaxChart($scope.codes); // 饼状图

    $scope.createTime = formatDate("YYYY-MM-DD", new Date());
    $scope.theme = 'default';
    $scope.maxDate = now;

    function init() {
        timeTaxChart();
    }

    init();

    // ngGrid初始化数据
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };

    $scope.pagingOptions = {
        pageSizes: [10, 20, 30],
        pageSize: '10',
        currentPage: 1
    };

    // 日期格式化方法
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

    tableScrollFun();

    function timeTaxChart() {
        var option = {
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
                x: '1.5%',
                y: '2%',
                textStyle: {
                    color: '#ffffff'
                },
                data: ['A汽车', 'B汽车', 'C汽车']
            },

            grid: {
                x: 20,
                y: 100,
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
                    name: 'A汽车',
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
                    name: 'B汽车',
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
                    name: 'C汽车',
                    type: 'line',
                    symbolSize: 16,
                    itemStyle: {
                        normal: {
                            width: 3,
                            color: 'rgb(37,208,255)'
                        }
                    },
                    data: data3
                }
            ]
        };

        var myChart = echarts.init(document.getElementById('timeTaxChartConfig'));
        myChart.setOption(option);

        window.addEventListener("resize", function () {
            myChart.resize();
        });

        intervalfun = setInterval(function () {
            var x = new Date(), // current time
              series = myChart.getOption().series;
            for (var i = 0; i < y.length; i++) {
                var temp = series[i].data[series[i].data.length - 1].value[1];
                series[i].data.shift();
                series[i].data.push({name: x.toString(), value: [x, temp + Math.round(Math.random() * 400)]});
            }

            myChart.setOption({
                series: series
            });

        }, interval);
    }

    // 离开页面后停止轮询
    $scope.$on('$destroy', function () {
        clearInterval(intervalfunc);
    });

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
        return Math.round(Math.random() * 25000 + 15000);
    }

    function areaTaxChart(data) {
        var categories = ['蜀山区', '经开区', '包河区', '庐阳区', '瑶海区', '政务区', '高新区', '新站区', '滨湖区'];
        var totalTax = [
            {value: getNumber(), name: "蜀山区"},
            {value: getNumber(), name: "经开区"},
            {value: getNumber(), name: "包河区"},
            {value: getNumber(), name: "庐阳区"},
            {value: getNumber(), name: "瑶海区"},
            {value: getNumber(), name: "政务区"},
            {value: getNumber(), name: "高新区"},
            {value: getNumber(), name: "新站区"},
            {value: getNumber(), name: "滨湖区"}
        ];

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
                formatter: "{a} <br/>{b} : {c} ({d}%)"
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
                                return '金额：' + params.value + '\n' + '占比:' + params.percent + '%';
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
            // color: ['rgb(255,202,57)', 'rgb(255,16,70)', 'rgb(233,0,199)', 'rgb(70,138,218)', 'rgb(39,198,206)', 'rgb(12,20,255)']
        };

        var myChart = echarts.init(document.getElementById('areaTaxChartConfig'));
        myChart.setOption(option);

        window.addEventListener("resize", function () {
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

