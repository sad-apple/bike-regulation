/**
 * Created by zhaochuanzhi on 2017/8/25.
 */
'use strict';
app.controller('carQuantitySuperviseController', ['$rootScope', '$scope', '$http', 'toaster', '$interval', function ($rootScope, $scope, $http, toaster, $interval) {

    var carA = 232; // 实际投放数量 1200
    var carB = 244;
    var carC = 213;
    var carD = 246;
    var carE = 265;

    var carAWell = 100; // 数量差
    var carBWell = 100;
    var carCWell = 100;
    var carDWell = 110;
    var carEWell = 140;

    var shuShan = 204; // 17%
    var baoHe = 180; // 15%
    var luYang = 108; // 9%
    var yaoHai = 132; // 11%
    var zhengWu = 144; // 12%
    var jingKai = 120; // 10%
    var gaoXin = 108; // 9%
    var binHu = 108;  // 9%
    var xinZhan = 96; // 8%

    // 获得车辆数量明细报表
    $scope.getCarQuantity = function () {
        $http.get("json/carQuantity.json").success(function (data) {
            $scope.carQuantityDtos = data;
        }).error(function (err) {
            alert("carQuantitySuperviseController: " + err.error);
        })
    };
    
    // 各区域投放车辆统计
    function makeAreaCarNumChart() {
        var areaCarNumChart = echarts.init(document.getElementById('areaCarNumChart'));
        var areaOption = {
            title: {
                text: '各区域投放汽车统计',
                subtext: '——————————',
                itemGap: 0,
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
                formatter: "{a} : {b} <br/>数量 : {c}<br/> 占比  : {d}%"
            },
            legend: {
                orient: 'horizontal',
                textStyle: {
                    color: '#DCDCDC'
                },
                x: 'center',
                top: '10%',
                itemWidth: 10,
                itemHeight: 10,
                borderRadius: 10,
                data: ['蜀山区', '经开区', '包河区', '庐阳区', '瑶海区', '政务区', '高新区', '新站区', '滨湖区'],
            },
            color: ["#EA9800", "#5986C5", "#D000C3", "#00D0FB", "#B583ED", "#6B5EED"],
            series: [{
                name: '公司',
                type: 'pie',
                radius: ['25%', '75%'],
                center: ['50%', '60%'],
                data: [{value: shuShan, name: '蜀山区'},
                    {value: jingKai, name: '经开区'},
                    {value: baoHe, name: '包河区'},
                    {value: luYang, name: '庐阳区'},
                    {value: yaoHai, name: '瑶海区'},
                    {value: zhengWu, name: '政务区'},
                    {value: gaoXin, name: '高新区'},
                    {value: xinZhan, name: '新站区'},
                    {value: binHu, name: '滨湖区'}],
                label: {
                    normal: {
                        formatter: "数量 : {c}\n占比 : {d}%",
                        position: "inner",
                        show: true
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                animationType: 'expansion',
                animationDuration: 4000
            }]
        };
        areaCarNumChart.setOption(areaOption);
        window.addEventListener("resize",function(){
            areaCarNumChart.resize();
        });
    }
    
    // 车辆数量统计
    function carNumChart() {
        var carNumChart = echarts.init(document.getElementById('carNumChart'));

        var option = {
            title: {
                text: '汽车数量统计',
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
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['应投数量', '实投数量', '数量差'],
                padding: [0, 0, 0, 30],
                left: 'left',
                textStyle: {
                    color: '#DCDCDC',
                    fontSize: 13
                },
                itemWidth: 10,
                itemHeight: 10,
                borderRadius: 10,
                top: '10%'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '20%',
                borderColor: '#51585F',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['A公司', 'B公司', 'C公司', 'D公司', 'E公司'],
                    axisLine: {
                        lineStyle: {
                            color: '#51585F'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#fff"
                        }
                    }
                }

            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#51585F'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#fff"
                        }
                    }
                }
            ],
            series: [
                {
                    name: '应投数量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#1BBC9C'
                        }
                    },
                    barWidth: '8%',
                    data: [carA + carAWell, carB + carBWell, carC + carCWell, carD + carDWell, carE + carEWell]
                },
                {
                    name: '实投数量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#3498DC'
                        }
                    },
                    barWidth: '8%',
                    data: [carA, carB, carC, carD, carE]
                },
                {
                    name: '数量差',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#9C59B7'
                        }
                    },
                    barWidth: '8%',
                    data: [carAWell, carBWell, carCWell, carDWell, carEWell]
                }
            ],
            animationEasing: 'circularOut',
            animationDuration: 3000,
            animationDelay: 700
        };
        carNumChart.setOption(option);
        
        window.addEventListener("resize",function(){
            carNumChart.resize();
        });
    }

    // 初始化数据
    function init() {
        makeAreaCarNumChart();
        carNumChart();
        $scope.getCarQuantity();
        tableScrollFun();
    }

    init();

}]);

