'use strict';

app.controller('showPointsController', ['$scope', '$http', 'toaster', '$state', function ($scope, $http) {

    function init() {
        $http.get('json/showPoints.json').success(function (datas) {
            datas = datas.map(function (serieData, idx) {
                var points = [];
                for (var i = 0; i < serieData.length; i++) {
                    var pt = [
                        serieData[i][0],
                        serieData[i][1]
                    ];
                    points.push(pt);
                }
                return points;
            });

            var em = document.getElementById("showPoints");
            var myChart = echarts.init(em, 'dark');

            var pointOption = {
                title: {
                    text: 'bike-points',
                    subtext: 'From ThinkGIS',
                    sublink: 'http://www.thinkgis.cn/public/sina',
                    left: 'center',
                    top: 'top',
                    textStyle: {
                        color: 'rgb(0, 255, 255)'
                    }
                },
                tooltip: {},
                legend: {
                    left: 'left',
                    data: ['强', '中', '弱'],
                    textStyle: {
                        color: 'rgb(0, 255, 255)'
                    }
                },
                bmap: {
                    center: [117.209866, 31.833485],
                    zoom: 12,
                    roam: true
                },
                series: [{
                    name: '弱',
                    type: 'scatterGL',
                    coordinateSystem: 'bmap',
                    symbolSize: 1,
                    itemStyle: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(0, 255, 255, 0.8)',
                        color: 'rgba(0, 255, 255, 0.8)'
                    },
                    data: datas[0]
                }, {
                    name: '中',
                    type: 'scatterGL',
                    coordinateSystem: 'bmap',
                    symbolSize: 1,
                    itemStyle: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(0, 255, 255, 0.8)',
                        color: 'rgba(0, 255, 255, 0.8)'
                    },
                    data: datas[0]
                }, {
                    name: '强',
                    type: 'scatterGL',
                    coordinateSystem: 'bmap',
                    symbolSize: 1,
                    itemStyle: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(0, 255, 255, 0.8)',
                        color: 'rgba(0, 255, 255, 0.8)'
                    },
                    data: datas[0]
                }]
            };
            myChart.setOption(pointOption);
        });
    }

    init();
    
}]);


