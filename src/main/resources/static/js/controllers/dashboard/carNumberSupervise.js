/**
 * Created by zhaochuanzhi on 2017/8/25.
 * 重点区域改造明细模块
 */

app.controller('carNumberSuperviseController', ['$rootScope', '$scope', '$http', '$interval', function ($rootScope, $scope, $http, $interval) {

    var timeInterval = 2000; // 时间间隔
    var roundData = [
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 180,
                "freeCarNum": 13,
                "fastCarNUm": 32,
                "carTotalNum": 45,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 10,
                "passengerNum": 191,
                "freeCarNum": 10,
                "fastCarNUm": 40,
                "carTotalNum": 50,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 157,
                "freeCarNum": 10,
                "fastCarNUm": 36,
                "carTotalNum": 46,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 164,
                "freeCarNum": 12,
                "fastCarNUm": 31,
                "carTotalNum": 43,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 181,
                "freeCarNum": 13,
                "fastCarNUm": 30,
                "carTotalNum": 43,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 16,
                "passengerNum": 180,
                "freeCarNum": 12,
                "fastCarNUm": 40,
                "carTotalNum": 52,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 171,
                "freeCarNum": 11,
                "fastCarNUm": 30,
                "carTotalNum": 41,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 14,
                "passengerNum": 151,
                "freeCarNum": 11,
                "fastCarNUm": 38,
                "carTotalNum": 49,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 10,
                "passengerNum": 157,
                "freeCarNum": 14,
                "fastCarNUm": 33,
                "carTotalNum": 47,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ],
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 18,
                "passengerNum": 191,
                "freeCarNum": 14,
                "fastCarNUm": 32,
                "carTotalNum": 46,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 197,
                "freeCarNum": 13,
                "fastCarNUm": 35,
                "carTotalNum": 48,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 12,
                "passengerNum": 152,
                "freeCarNum": 14,
                "fastCarNUm": 37,
                "carTotalNum": 51,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 12,
                "passengerNum": 187,
                "freeCarNum": 14,
                "fastCarNUm": 36,
                "carTotalNum": 50,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 198,
                "freeCarNum": 15,
                "fastCarNUm": 32,
                "carTotalNum": 47,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 11,
                "passengerNum": 161,
                "freeCarNum": 12,
                "fastCarNUm": 36,
                "carTotalNum": 48,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 18,
                "passengerNum": 183,
                "freeCarNum": 13,
                "fastCarNUm": 40,
                "carTotalNum": 53,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 187,
                "freeCarNum": 14,
                "fastCarNUm": 32,
                "carTotalNum": 46,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 175,
                "freeCarNum": 15,
                "fastCarNUm": 33,
                "carTotalNum": 48,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ],
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 11,
                "passengerNum": 187,
                "freeCarNum": 14,
                "fastCarNUm": 38,
                "carTotalNum": 52,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 165,
                "freeCarNum": 11,
                "fastCarNUm": 34,
                "carTotalNum": 45,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 159,
                "freeCarNum": 13,
                "fastCarNUm": 30,
                "carTotalNum": 43,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 195,
                "freeCarNum": 10,
                "fastCarNUm": 31,
                "carTotalNum": 41,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 11,
                "passengerNum": 168,
                "freeCarNum": 12,
                "fastCarNUm": 36,
                "carTotalNum": 48,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 183,
                "freeCarNum": 10,
                "fastCarNUm": 39,
                "carTotalNum": 49,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 16,
                "passengerNum": 158,
                "freeCarNum": 12,
                "fastCarNUm": 33,
                "carTotalNum": 45,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 20,
                "passengerNum": 198,
                "freeCarNum": 15,
                "fastCarNUm": 34,
                "carTotalNum": 49,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 20,
                "passengerNum": 164,
                "freeCarNum": 12,
                "fastCarNUm": 36,
                "carTotalNum": 48,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ],
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 11,
                "passengerNum": 199,
                "freeCarNum": 12,
                "fastCarNUm": 35,
                "carTotalNum": 47,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 16,
                "passengerNum": 164,
                "freeCarNum": 14,
                "fastCarNUm": 37,
                "carTotalNum": 51,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 18,
                "passengerNum": 156,
                "freeCarNum": 13,
                "fastCarNUm": 38,
                "carTotalNum": 51,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 15,
                "passengerNum": 193,
                "freeCarNum": 12,
                "fastCarNUm": 34,
                "carTotalNum": 46,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 167,
                "freeCarNum": 13,
                "fastCarNUm": 31,
                "carTotalNum": 44,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 10,
                "passengerNum": 168,
                "freeCarNum": 10,
                "fastCarNUm": 33,
                "carTotalNum": 43,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 11,
                "passengerNum": 192,
                "freeCarNum": 11,
                "fastCarNUm": 31,
                "carTotalNum": 42,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 20,
                "passengerNum": 176,
                "freeCarNum": 13,
                "fastCarNUm": 35,
                "carTotalNum": 48,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 198,
                "freeCarNum": 12,
                "fastCarNUm": 31,
                "carTotalNum": 43,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ],
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 197,
                "freeCarNum": 11,
                "fastCarNUm": 37,
                "carTotalNum": 48,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 166,
                "freeCarNum": 15,
                "fastCarNUm": 36,
                "carTotalNum": 51,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 156,
                "freeCarNum": 11,
                "fastCarNUm": 35,
                "carTotalNum": 46,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 170,
                "freeCarNum": 12,
                "fastCarNUm": 39,
                "carTotalNum": 51,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 20,
                "passengerNum": 173,
                "freeCarNum": 15,
                "fastCarNUm": 33,
                "carTotalNum": 48,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 16,
                "passengerNum": 195,
                "freeCarNum": 12,
                "fastCarNUm": 33,
                "carTotalNum": 45,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 18,
                "passengerNum": 187,
                "freeCarNum": 12,
                "fastCarNUm": 37,
                "carTotalNum": 49,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 18,
                "passengerNum": 199,
                "freeCarNum": 14,
                "fastCarNUm": 34,
                "carTotalNum": 48,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 12,
                "passengerNum": 159,
                "freeCarNum": 11,
                "fastCarNUm": 33,
                "carTotalNum": 44,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ],
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 15,
                "passengerNum": 169,
                "freeCarNum": 13,
                "fastCarNUm": 34,
                "carTotalNum": 47,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 11,
                "passengerNum": 195,
                "freeCarNum": 15,
                "fastCarNUm": 40,
                "carTotalNum": 55,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 183,
                "freeCarNum": 13,
                "fastCarNUm": 35,
                "carTotalNum": 48,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 12,
                "passengerNum": 156,
                "freeCarNum": 13,
                "fastCarNUm": 32,
                "carTotalNum": 45,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 14,
                "passengerNum": 194,
                "freeCarNum": 15,
                "fastCarNUm": 31,
                "carTotalNum": 46,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 150,
                "freeCarNum": 13,
                "fastCarNUm": 37,
                "carTotalNum": 50,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 174,
                "freeCarNum": 11,
                "fastCarNUm": 38,
                "carTotalNum": 49,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 183,
                "freeCarNum": 12,
                "fastCarNUm": 37,
                "carTotalNum": 49,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 16,
                "passengerNum": 173,
                "freeCarNum": 13,
                "fastCarNUm": 39,
                "carTotalNum": 52,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ],
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 12,
                "passengerNum": 161,
                "freeCarNum": 11,
                "fastCarNUm": 40,
                "carTotalNum": 51,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 15,
                "passengerNum": 192,
                "freeCarNum": 11,
                "fastCarNUm": 37,
                "carTotalNum": 48,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 14,
                "passengerNum": 151,
                "freeCarNum": 12,
                "fastCarNUm": 30,
                "carTotalNum": 42,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 11,
                "passengerNum": 161,
                "freeCarNum": 11,
                "fastCarNUm": 37,
                "carTotalNum": 48,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 12,
                "passengerNum": 192,
                "freeCarNum": 15,
                "fastCarNUm": 39,
                "carTotalNum": 54,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 186,
                "freeCarNum": 11,
                "fastCarNUm": 35,
                "carTotalNum": 46,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 171,
                "freeCarNum": 10,
                "fastCarNUm": 40,
                "carTotalNum": 50,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 190,
                "freeCarNum": 11,
                "fastCarNUm": 40,
                "carTotalNum": 51,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 11,
                "passengerNum": 174,
                "freeCarNum": 10,
                "fastCarNUm": 37,
                "carTotalNum": 47,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ],
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 11,
                "passengerNum": 186,
                "freeCarNum": 12,
                "fastCarNUm": 38,
                "carTotalNum": 50,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 175,
                "freeCarNum": 12,
                "fastCarNUm": 36,
                "carTotalNum": 48,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 16,
                "passengerNum": 193,
                "freeCarNum": 11,
                "fastCarNUm": 31,
                "carTotalNum": 42,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 16,
                "passengerNum": 195,
                "freeCarNum": 12,
                "fastCarNUm": 33,
                "carTotalNum": 45,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 14,
                "passengerNum": 174,
                "freeCarNum": 11,
                "fastCarNUm": 33,
                "carTotalNum": 44,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 16,
                "passengerNum": 184,
                "freeCarNum": 10,
                "fastCarNUm": 31,
                "carTotalNum": 41,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 193,
                "freeCarNum": 14,
                "fastCarNUm": 39,
                "carTotalNum": 53,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 16,
                "passengerNum": 170,
                "freeCarNum": 12,
                "fastCarNUm": 31,
                "carTotalNum": 43,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 161,
                "freeCarNum": 14,
                "fastCarNUm": 35,
                "carTotalNum": 49,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ],
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 10,
                "passengerNum": 161,
                "freeCarNum": 13,
                "fastCarNUm": 30,
                "carTotalNum": 43,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 192,
                "freeCarNum": 11,
                "fastCarNUm": 40,
                "carTotalNum": 51,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 182,
                "freeCarNum": 13,
                "fastCarNUm": 38,
                "carTotalNum": 51,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 11,
                "passengerNum": 199,
                "freeCarNum": 15,
                "fastCarNUm": 40,
                "carTotalNum": 55,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 10,
                "passengerNum": 155,
                "freeCarNum": 13,
                "fastCarNUm": 34,
                "carTotalNum": 47,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 20,
                "passengerNum": 196,
                "freeCarNum": 14,
                "fastCarNUm": 40,
                "carTotalNum": 54,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 14,
                "passengerNum": 183,
                "freeCarNum": 10,
                "fastCarNUm": 33,
                "carTotalNum": 43,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 14,
                "passengerNum": 182,
                "freeCarNum": 11,
                "fastCarNUm": 38,
                "carTotalNum": 49,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 18,
                "passengerNum": 193,
                "freeCarNum": 14,
                "fastCarNUm": 36,
                "carTotalNum": 50,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ],
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 18,
                "passengerNum": 181,
                "freeCarNum": 11,
                "fastCarNUm": 38,
                "carTotalNum": 49,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 14,
                "passengerNum": 159,
                "freeCarNum": 11,
                "fastCarNUm": 30,
                "carTotalNum": 41,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 12,
                "passengerNum": 155,
                "freeCarNum": 14,
                "fastCarNUm": 32,
                "carTotalNum": 46,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 12,
                "passengerNum": 154,
                "freeCarNum": 12,
                "fastCarNUm": 35,
                "carTotalNum": 47,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 176,
                "freeCarNum": 12,
                "fastCarNUm": 33,
                "carTotalNum": 45,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 169,
                "freeCarNum": 11,
                "fastCarNUm": 37,
                "carTotalNum": 48,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 160,
                "freeCarNum": 14,
                "fastCarNUm": 34,
                "carTotalNum": 48,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 15,
                "passengerNum": 185,
                "freeCarNum": 12,
                "fastCarNUm": 38,
                "carTotalNum": 50,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 172,
                "freeCarNum": 14,
                "fastCarNUm": 33,
                "carTotalNum": 47,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ],
        [
            {
                "area": "蜀山区",
                "tradingArea": "银泰城",
                "foundTime": 1508118346605,
                "emptyCarNum": 18,
                "passengerNum": 176,
                "freeCarNum": 12,
                "fastCarNUm": 38,
                "carTotalNum": 50,
                "lat": 31.825425,
                "lon": 117.239866
            },
            {
                "area": "政务区",
                "tradingArea": "万达广场政务区店",
                "foundTime": 1508118346605,
                "emptyCarNum": 17,
                "passengerNum": 187,
                "freeCarNum": 12,
                "fastCarNUm": 32,
                "carTotalNum": 44,
                "lat": 31.825662,
                "lon": 117.226569
            },
            {
                "area": "蜀山区",
                "tradingArea": "新地中心",
                "foundTime": 1508118346605,
                "emptyCarNum": 14,
                "passengerNum": 190,
                "freeCarNum": 15,
                "fastCarNUm": 32,
                "carTotalNum": 47,
                "lat": 31.812524,
                "lon": 117.237301
            },
            {
                "area": "蜀山区",
                "tradingArea": "华瑞五彩城",
                "foundTime": 1508118346605,
                "emptyCarNum": 13,
                "passengerNum": 188,
                "freeCarNum": 14,
                "fastCarNUm": 34,
                "carTotalNum": 48,
                "lat": 31.834925,
                "lon": 117.257961
            },
            {
                "area": "蜀山区",
                "tradingArea": "大唐国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 16,
                "passengerNum": 166,
                "freeCarNum": 11,
                "fastCarNUm": 36,
                "carTotalNum": 47,
                "lat": 31.838286,
                "lon": 117.23973
            },
            {
                "area": "蜀山区",
                "tradingArea": "安粮国际广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 18,
                "passengerNum": 161,
                "freeCarNum": 12,
                "fastCarNUm": 35,
                "carTotalNum": 47,
                "lat": 31.823255,
                "lon": 117.259682
            },
            {
                "area": "政务区",
                "tradingArea": "1912商街",
                "foundTime": 1508118346605,
                "emptyCarNum": 14,
                "passengerNum": 181,
                "freeCarNum": 12,
                "fastCarNUm": 31,
                "carTotalNum": 43,
                "lat": 31.845557,
                "lon": 117.228162
            },
            {
                "area": "经开区",
                "tradingArea": "港澳广场",
                "foundTime": 1508118346605,
                "emptyCarNum": 19,
                "passengerNum": 176,
                "freeCarNum": 14,
                "fastCarNUm": 37,
                "carTotalNum": 51,
                "lat": 31.796352,
                "lon": 117.213486
            },
            {
                "area": "蜀山区",
                "tradingArea": "合肥科技馆",
                "foundTime": 1508118346605,
                "emptyCarNum": 20,
                "passengerNum": 181,
                "freeCarNum": 15,
                "fastCarNUm": 31,
                "carTotalNum": 46,
                "lat": 31.847861,
                "lon": 117.255926
            }
        ]
    ];

    var num = 0;
    // 商圈循环数据
    $scope.roundDataFun = function () {
        var data = roundData[num];
        num = num % 9 + 1;
        makeShoopDatas(data);
        formatData(data);
    };

    // 从数据库中取出数据
    $scope.getPagedDataAsync = function () {
        $http.get("json/numberSupervise.json").success(function (data) {
            randomData(data);
            $scope.carNumSupervises = data;
            $scope.roundDataFun();
        }).error(function (err) {
            alert("carNumberSuperviseController: " + err.error);
        });
    };

    // 每隔一定的时间循环数据
    var interval = $interval(function(){
        $scope.roundDataFun();
    },timeInterval,-1);

    // 离开页面后停止轮询
    $scope.$on('$destroy', function () {
        $interval.cancel(interval);
    });

    $scope.getPagedDataAsync();
    tableScrollFun();
    // 对从数据库中取出的数据进行格式化
    function randomData (data) {
        angular.forEach(data, function(item){
            item.foundTime = new Date(((new Date()).getTime() - ((index * parseInt(Math.random() * 4)) * 60 * 1000))); // 实时日期
        });
    }

    // 格式化商圈排行数据
    function formatData(data) {
        var arrs = [];
        for (var i = 0; i < data.length; i++){
            var arr = {
                id:i+1,
                tradingArea : data[i].tradingArea,
                carTotalNum : data[i].carTotalNum
            };
            arrs.push(arr);
            $scope.carTotalNums = arrs.sort(compare('carTotalNum'));
        }
    }

    // 排序方法
    function compare(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
        }
    }

    //------------------------- mapChart start ------------------------------//
    var shoopDatas = []; // 商圈数据

    // 构造商圈数据
    function makeShoopDatas(shoopInfos) {
        for (var i = 0; i < shoopInfos.length; i ++) {
            var shoopData = {
                name: shoopInfos[i].tradingArea,
                value: [shoopInfos[i].lon, shoopInfos[i].lat, shoopInfos[i].carTotalNum]
            };
            shoopDatas.push(shoopData);
        }
        showShoopDatas(shoopDatas);
    }

    // 车辆分布地图
    function showShoopDatas(shoopDatas) {
        var mapChart = echarts.init(document.getElementById("mapChart"));
        var mapOption = {
            bmap: {
                center: [117.241741, 31.821535],
                zoom: 14,
                roam: true,
                mapStyle: {
                    styleJson : [
                        {
                            "featureType": "land",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#212121"
                            }
                        },
                        {
                            "featureType": "building",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#2b2b2b"
                            }
                        },
                        {
                            "featureType": "highway",
                            "elementType": "all",
                            "stylers": {
                                "lightness": -42,
                                "saturation": -91
                            }
                        },
                        {
                            "featureType": "arterial",
                            "elementType": "geometry",
                            "stylers": {
                                "lightness": -77,
                                "saturation": -94
                            }
                        },
                        {
                            "featureType": "green",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#1b1b1b"
                            }
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#181818"
                            }
                        },
                        {
                            "featureType": "subway",
                            "elementType": "geometry.stroke",
                            "stylers": {
                                "color": "#181818"
                            }
                        },
                        {
                            "featureType": "railway",
                            "elementType": "geometry",
                            "stylers": {
                                "lightness": -52
                            }
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": {
                                "color": "#313131"
                            }
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": {
                                "color": "#8b8787"
                            }
                        },
                        {
                            "featureType": "manmade",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#1b1b1b"
                            }
                        },
                        {
                            "featureType": "local",
                            "elementType": "geometry",
                            "stylers": {
                                "lightness": -75,
                                "saturation": -91
                            }
                        },
                        {
                            "featureType": "subway",
                            "elementType": "geometry",
                            "stylers": {
                                "lightness": -65
                            }
                        },
                        {
                            "featureType": "railway",
                            "elementType": "all",
                            "stylers": {
                                "lightness": -40
                            }
                        },
                        {
                            "featureType": "boundary",
                            "elementType": "geometry",
                            "stylers": {
                                "color": "#8b8787",
                                "weight": "1",
                                "lightness": -29
                            }
                        }
                    ]
                }
            },
            series : [
                {
                    name: '商圈',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: shoopDatas,
                    symbolSize: 80,
                    label: {
                        normal: {
                            formatter: function (params) {
                                return params.name + '\n' +
                                     ' ' +  params.value[2]+"辆";
                            },
                            position: 'inside',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#009285'
                        }
                    }
                }]
        };
        mapChart.setOption(mapOption);
    }
    //------------------------- mapChart end ------------------------------//

}]);
