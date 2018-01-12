'use strict';

app.controller('dashboardCtrl', ["$rootScope", "$scope", "$http", '$interval', function ($rootScope, $scope, $http, $interval) {
  var myChart;
  var bikeLines;

  var myChart1, myChart2, myChart3, myChart4;

  //echarts自适应
  function reSizeEcharts() {
    myChart1.resize();
    myChart2.resize();
    myChart3.resize();
    myChart4.resize();
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwbGV6c3AiLCJhIjoiY2o2M2d4a29tMWk2MDMzbjBqN2tzYnFtaSJ9.dz9X56MZcT3cqr0cx9hiwg';

  // 单车沿路线运动图
  function initBikeLines() {
    var lineOption = {
      mapbox: {
        center: [117.282827, 31.859858],
        zoom: 13,
        pitch: 50,
        bearing: -10,
        altitudeScale: 2,
        // style: {
        //   "version": 8,
        //   "name": "Dark-2-simplistic",
        //   "metadata": {
        //     "mapbox:autocomposite": true,
        //     "mapbox:type": "default",
        //     "mapbox:origin": "dark-v9",
        //     "mapbox:groups": {
        //       "1444933322393.2852": {
        //         "name": "POI labels  (scalerank 1)",
        //         "collapsed": true
        //       },
        //       "1444855786460.0557": {
        //         "name": "Roads",
        //         "collapsed": true
        //       },
        //       "1444856151690.9143": {
        //         "name": "State labels",
        //         "collapsed": true
        //       },
        //       "1444933721429.3076": {
        //         "name": "Road labels",
        //         "collapsed": false
        //       },
        //       "1444933808272.805": {
        //         "name": "Water labels",
        //         "collapsed": true
        //       },
        //       "1444862510685.128": {
        //         "name": "City labels",
        //         "collapsed": true
        //       }
        //     },
        //     "mapbox:sdk-support": {}
        //   },
        //   "center": [
        //     116.38315066984944,
        //     39.90330627987743
        //   ],
        //   "zoom": 15.613086160570317,
        //   "bearing": 0,
        //   "pitch": 11.000000000000004,
        //   "light": {
        //     "anchor": "map"
        //   },
        //   "sources": {
        //     "composite": {
        //       "url": "mapbox://mapbox.mapbox-streets-v7",
        //       "type": "vector"
        //     }
        //   },
        //   "sprite": "mapbox://sprites/applezsp/cj8gx3oq81p382slblk1568at",
        //   "glyphs": "mapbox://fonts/applezsp/{fontstack}/{range}.pbf",
        //   "layers": [
        //     {
        //       "id": "background",
        //       "type": "background",
        //       "layout": {},
        //       "paint": {
        //         "background-color": "#000102"
        //       }
        //     },
        //     {
        //       "id": "water",
        //       "type": "fill",
        //       "source": "composite",
        //       "source-layer": "water",
        //       "layout": {
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "fill-color": "#031628"
        //       }
        //     },
        //     {
        //       "id": "road-pedestrian-case",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 12,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "==",
        //             "class",
        //             "pedestrian"
        //           ],
        //           [
        //             "==",
        //             "structure",
        //             "none"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-join": "round",
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               14.5
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-gap-width": 0,
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               13.9,
        //               0
        //             ],
        //             [
        //               14,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-street-low",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 11,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "==",
        //             "class",
        //             "street"
        //           ],
        //           [
        //             "==",
        //             "structure",
        //             "none"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12.5,
        //               0.5
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": {
        //           "stops": [
        //             [
        //               11,
        //               0
        //             ],
        //             [
        //               11.25,
        //               1
        //             ],
        //             [
        //               14,
        //               1
        //             ],
        //             [
        //               14.01,
        //               0
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-street_limited-low",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 11,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "==",
        //             "class",
        //             "street_limited"
        //           ],
        //           [
        //             "==",
        //             "structure",
        //             "none"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12.5,
        //               0.5
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": {
        //           "stops": [
        //             [
        //               11,
        //               0
        //             ],
        //             [
        //               11.25,
        //               1
        //             ],
        //             [
        //               14,
        //               1
        //             ],
        //             [
        //               14.01,
        //               0
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-service-link-track-case",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 14,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!=",
        //             "type",
        //             "trunk_link"
        //           ],
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "in",
        //             "class",
        //             "link",
        //             "service",
        //             "track"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12,
        //               0.75
        //             ],
        //             [
        //               20,
        //               2
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-gap-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               14,
        //               0.5
        //             ],
        //             [
        //               18,
        //               12
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               13.9,
        //               0
        //             ],
        //             [
        //               14,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-street_limited-case",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 11,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "==",
        //             "class",
        //             "street_limited"
        //           ],
        //           [
        //             "==",
        //             "structure",
        //             "none"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12,
        //               0.75
        //             ],
        //             [
        //               20,
        //               2
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-gap-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               13,
        //               0
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               13.9,
        //               0
        //             ],
        //             [
        //               14,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-street-case",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 11,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "==",
        //             "class",
        //             "street"
        //           ],
        //           [
        //             "==",
        //             "structure",
        //             "none"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12,
        //               0.75
        //             ],
        //             [
        //               20,
        //               2
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-gap-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               13,
        //               0
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               13.9,
        //               0
        //             ],
        //             [
        //               14,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-main-case",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "in",
        //             "class",
        //             "secondary",
        //             "tertiary"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.2,
        //           "stops": [
        //             [
        //               10,
        //               0.75
        //             ],
        //             [
        //               18,
        //               2
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-gap-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               8.5,
        //               0.5
        //             ],
        //             [
        //               10,
        //               0.75
        //             ],
        //             [
        //               18,
        //               26
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               6,
        //               0
        //             ],
        //             [
        //               7,
        //               0.4
        //             ],
        //             [
        //               9,
        //               0.5
        //             ],
        //             [
        //               10,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-primary-case",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "class",
        //             "primary"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               5,
        //               0.75
        //             ],
        //             [
        //               16,
        //               2
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-gap-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               5,
        //               0.75
        //             ],
        //             [
        //               18,
        //               32
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               6,
        //               0
        //             ],
        //             [
        //               7,
        //               0.4
        //             ],
        //             [
        //               9,
        //               0.5
        //             ],
        //             [
        //               10,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-motorway_link-case",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 10,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "class",
        //             "motorway_link"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12,
        //               0.75
        //             ],
        //             [
        //               20,
        //               2
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-gap-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12,
        //               0.5
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               6,
        //               0
        //             ],
        //             [
        //               7,
        //               0.4
        //             ],
        //             [
        //               9,
        //               0.5
        //             ],
        //             [
        //               10,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-trunk_link-case",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 11,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "type",
        //             "trunk_link"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12,
        //               0.75
        //             ],
        //             [
        //               20,
        //               2
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-gap-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12,
        //               0.5
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               6,
        //               0
        //             ],
        //             [
        //               7,
        //               0.4
        //             ],
        //             [
        //               9,
        //               0.5
        //             ],
        //             [
        //               10,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-trunk-case",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 5,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "class",
        //             "trunk"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               7,
        //               0.5
        //             ],
        //             [
        //               10,
        //               1
        //             ],
        //             [
        //               16,
        //               2
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-gap-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               5,
        //               0.5
        //             ],
        //             [
        //               9,
        //               1.4
        //             ],
        //             [
        //               18,
        //               32
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               6,
        //               0
        //             ],
        //             [
        //               6.1,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-motorway-case",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "class",
        //             "motorway"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               7,
        //               0.5
        //             ],
        //             [
        //               10,
        //               1
        //             ],
        //             [
        //               16,
        //               2
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-gap-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               5,
        //               0.75
        //             ],
        //             [
        //               18,
        //               32
        //             ]
        //           ]
        //         },
        //         "line-opacity": 1
        //       }
        //     },
        //     {
        //       "id": "road-construction",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 14,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "==",
        //             "class",
        //             "construction"
        //           ],
        //           [
        //             "==",
        //             "structure",
        //             "none"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-join": "miter"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12.5,
        //               0.5
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               13.99,
        //               0
        //             ],
        //             [
        //               14,
        //               1
        //             ]
        //           ]
        //         },
        //         "line-dasharray": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               14,
        //               [
        //                 0.4,
        //                 0.8
        //               ]
        //             ],
        //             [
        //               15,
        //               [
        //                 0.3,
        //                 0.6
        //               ]
        //             ],
        //             [
        //               16,
        //               [
        //                 0.2,
        //                 0.3
        //               ]
        //             ],
        //             [
        //               17,
        //               [
        //                 0.2,
        //                 0.25
        //               ]
        //             ],
        //             [
        //               18,
        //               [
        //                 0.15,
        //                 0.15
        //               ]
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-sidewalks",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 16,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "in",
        //             "type",
        //             "crossing",
        //             "sidewalk"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               15,
        //               1
        //             ],
        //             [
        //               18,
        //               4
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-dasharray": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               14,
        //               [
        //                 1,
        //                 0
        //               ]
        //             ],
        //             [
        //               15,
        //               [
        //                 1.75,
        //                 1
        //               ]
        //             ],
        //             [
        //               16,
        //               [
        //                 1,
        //                 0.75
        //               ]
        //             ],
        //             [
        //               17,
        //               [
        //                 1,
        //                 0.5
        //               ]
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               16,
        //               0
        //             ],
        //             [
        //               16.25,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-path",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "!in",
        //             "type",
        //             "crossing",
        //             "sidewalk",
        //             "steps"
        //           ],
        //           [
        //             "==",
        //             "class",
        //             "path"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-join": "round",
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               15,
        //               1
        //             ],
        //             [
        //               18,
        //               4
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-dasharray": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               14,
        //               [
        //                 1,
        //                 0
        //               ]
        //             ],
        //             [
        //               15,
        //               [
        //                 1.75,
        //                 1
        //               ]
        //             ],
        //             [
        //               16,
        //               [
        //                 1,
        //                 0.75
        //               ]
        //             ],
        //             [
        //               17,
        //               [
        //                 1,
        //                 0.5
        //               ]
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               14,
        //               0
        //             ],
        //             [
        //               14.25,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-steps",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "type",
        //             "steps"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               15,
        //               1
        //             ],
        //             [
        //               18,
        //               4
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-dasharray": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               14,
        //               [
        //                 1,
        //                 0
        //               ]
        //             ],
        //             [
        //               15,
        //               [
        //                 1.75,
        //                 1
        //               ]
        //             ],
        //             [
        //               16,
        //               [
        //                 1,
        //                 0.75
        //               ]
        //             ],
        //             [
        //               17,
        //               [
        //                 0.3,
        //                 0.3
        //               ]
        //             ]
        //           ]
        //         },
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               14,
        //               0
        //             ],
        //             [
        //               14.25,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-trunk_link",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 11,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "type",
        //             "trunk_link"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12,
        //               0.5
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": 1
        //       }
        //     },
        //     {
        //       "id": "road-motorway_link",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 10,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "class",
        //             "motorway_link"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12,
        //               0.5
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": 1
        //       }
        //     },
        //     {
        //       "id": "road-pedestrian",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 12,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "==",
        //             "class",
        //             "pedestrian"
        //           ],
        //           [
        //             "==",
        //             "structure",
        //             "none"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               14,
        //               0.5
        //             ],
        //             [
        //               18,
        //               12
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": 1,
        //         "line-dasharray": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               14,
        //               [
        //                 1,
        //                 0
        //               ]
        //             ],
        //             [
        //               15,
        //               [
        //                 1.5,
        //                 0.4
        //               ]
        //             ],
        //             [
        //               16,
        //               [
        //                 1,
        //                 0.2
        //               ]
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-service-link-track",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 14,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!=",
        //             "type",
        //             "trunk_link"
        //           ],
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "in",
        //             "class",
        //             "link",
        //             "service",
        //             "track"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               14,
        //               0.5
        //             ],
        //             [
        //               18,
        //               12
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)"
        //       }
        //     },
        //     {
        //       "id": "road-street_limited",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 11,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "==",
        //             "class",
        //             "street_limited"
        //           ],
        //           [
        //             "==",
        //             "structure",
        //             "none"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12.5,
        //               0.5
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               13.99,
        //               0
        //             ],
        //             [
        //               14,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-street",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 11,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "==",
        //             "class",
        //             "street"
        //           ],
        //           [
        //             "==",
        //             "structure",
        //             "none"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               12.5,
        //               0.5
        //             ],
        //             [
        //               14,
        //               2
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               13.99,
        //               0
        //             ],
        //             [
        //               14,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-secondary-tertiary",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "in",
        //             "class",
        //             "secondary",
        //             "tertiary"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               8.5,
        //               0.5
        //             ],
        //             [
        //               10,
        //               0.75
        //             ],
        //             [
        //               18,
        //               26
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": {
        //           "base": 1.2,
        //           "stops": [
        //             [
        //               5,
        //               0
        //             ],
        //             [
        //               5.5,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-primary",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "class",
        //             "primary"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               5,
        //               0.75
        //             ],
        //             [
        //               18,
        //               32
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": {
        //           "base": 1.2,
        //           "stops": [
        //             [
        //               5,
        //               0
        //             ],
        //             [
        //               5.5,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-trunk",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 5,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "class",
        //             "trunk"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               5,
        //               0.5
        //             ],
        //             [
        //               9,
        //               1.4
        //             ],
        //             [
        //               18,
        //               32
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": 1
        //       }
        //     },
        //     {
        //       "id": "road-motorway",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "==",
        //             "class",
        //             "motorway"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-cap": "round",
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-width": {
        //           "base": 1.5,
        //           "stops": [
        //             [
        //               5,
        //               0.75
        //             ],
        //             [
        //               18,
        //               32
        //             ]
        //           ]
        //         },
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-opacity": 1
        //       }
        //     },
        //     {
        //       "id": "road-rail",
        //       "type": "line",
        //       "metadata": {
        //         "mapbox:group": "1444855786460.0557"
        //       },
        //       "source": "composite",
        //       "source-layer": "road",
        //       "minzoom": 13,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "all",
        //           [
        //             "!in",
        //             "structure",
        //             "bridge",
        //             "tunnel"
        //           ],
        //           [
        //             "in",
        //             "class",
        //             "major_rail",
        //             "minor_rail"
        //           ]
        //         ]
        //       ],
        //       "layout": {
        //         "line-join": "round"
        //       },
        //       "paint": {
        //         "line-color": "hsla(0, 0%, 10%, 0.75)",
        //         "line-width": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               14,
        //               0.75
        //             ],
        //             [
        //               20,
        //               1
        //             ]
        //           ]
        //         }
        //       }
        //     },
        //     {
        //       "id": "road-label-small",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444933721429.3076"
        //       },
        //       "source": "composite",
        //       "source-layer": "road_label",
        //       "minzoom": 15,
        //       "filter": [
        //         "all",
        //         [
        //           "!in",
        //           "class",
        //           "ferry",
        //           "golf",
        //           "link",
        //           "motorway",
        //           "path",
        //           "pedestrian",
        //           "primary",
        //           "secondary",
        //           "street",
        //           "street_limited",
        //           "tertiary",
        //           "track",
        //           "trunk"
        //         ],
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ]
        //       ],
        //       "layout": {
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               15,
        //               10
        //             ],
        //             [
        //               20,
        //               13
        //             ]
        //           ]
        //         },
        //         "text-max-angle": 30,
        //         "symbol-spacing": 500,
        //         "text-font": [
        //           "DIN Offc Pro Regular",
        //           "Arial Unicode MS Regular"
        //         ],
        //         "symbol-placement": "line",
        //         "text-padding": 1,
        //         "visibility": "visible",
        //         "text-rotation-alignment": "map",
        //         "text-anchor": "top-left",
        //         "text-pitch-alignment": "viewport",
        //         "text-field": "{name_zh-Hans}",
        //         "text-letter-spacing": 0.01
        //       },
        //       "paint": {
        //         "text-color": "hsl(0, 0%, 78%)",
        //         "text-halo-color": "#212121",
        //         "text-halo-width": 1.25,
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.38
        //       }
        //     },
        //     {
        //       "id": "road-label-medium",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444933721429.3076"
        //       },
        //       "source": "composite",
        //       "source-layer": "road_label",
        //       "minzoom": 13,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "$type",
        //           "LineString"
        //         ],
        //         [
        //           "in",
        //           "class",
        //           "link",
        //           "pedestrian",
        //           "street",
        //           "street_limited"
        //         ]
        //       ],
        //       "layout": {
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               11,
        //               10
        //             ],
        //             [
        //               20,
        //               14
        //             ]
        //           ]
        //         },
        //         "text-max-angle": 30,
        //         "symbol-spacing": 500,
        //         "text-font": [
        //           "DIN Offc Pro Regular",
        //           "Arial Unicode MS Regular"
        //         ],
        //         "symbol-placement": "line",
        //         "text-padding": 1,
        //         "visibility": "visible",
        //         "text-rotation-alignment": "map",
        //         "text-pitch-alignment": "viewport",
        //         "text-field": "{name_zh-Hans}",
        //         "text-letter-spacing": 0.01
        //       },
        //       "paint": {
        //         "text-color": "hsl(0, 0%, 78%)",
        //         "text-halo-color": "#212121",
        //         "text-halo-width": 1,
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.38
        //       }
        //     },
        //     {
        //       "id": "road-label-large",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444933721429.3076"
        //       },
        //       "source": "composite",
        //       "source-layer": "road_label",
        //       "minzoom": 12,
        //       "filter": [
        //         "in",
        //         "class",
        //         "motorway",
        //         "primary",
        //         "secondary",
        //         "tertiary",
        //         "trunk"
        //       ],
        //       "layout": {
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               9,
        //               10
        //             ],
        //             [
        //               20,
        //               16
        //             ]
        //           ]
        //         },
        //         "text-max-angle": 30,
        //         "symbol-spacing": 400,
        //         "text-font": [
        //           "DIN Offc Pro Regular",
        //           "Arial Unicode MS Regular"
        //         ],
        //         "symbol-placement": "line",
        //         "text-padding": 1,
        //         "visibility": "visible",
        //         "text-rotation-alignment": "map",
        //         "text-pitch-alignment": "viewport",
        //         "text-field": "{name_zh-Hans}",
        //         "text-letter-spacing": 0.01
        //       },
        //       "paint": {
        //         "text-color": "hsl(0, 0%, 78%)",
        //         "text-halo-color": "#212121",
        //         "text-halo-width": 1,
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.38
        //       }
        //     },
        //     {
        //       "id": "water-label",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444933808272.805"
        //       },
        //       "source": "composite",
        //       "source-layer": "water_label",
        //       "minzoom": 5,
        //       "filter": [
        //         ">",
        //         "area",
        //         10000
        //       ],
        //       "layout": {
        //         "text-field": "{name_zh-Hans}",
        //         "text-font": [
        //           "DIN Offc Pro Italic",
        //           "Arial Unicode MS Regular"
        //         ],
        //         "text-max-width": 7,
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               13,
        //               13
        //             ],
        //             [
        //               18,
        //               18
        //             ]
        //           ]
        //         },
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-color": "hsl(0, 0%, 32%)",
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.44
        //       }
        //     },
        //     {
        //       "id": "poi-parks-scalerank1",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444933322393.2852"
        //       },
        //       "source": "composite",
        //       "source-layer": "poi_label",
        //       "filter": [
        //         "all",
        //         [
        //           "<=",
        //           "scalerank",
        //           1
        //         ],
        //         [
        //           "in",
        //           "maki",
        //           "campsite",
        //           "cemetery",
        //           "dog-park",
        //           "garden",
        //           "golf",
        //           "park",
        //           "picnic-site",
        //           "playground",
        //           "zoo"
        //         ]
        //       ],
        //       "layout": {
        //         "text-line-height": 1.1,
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               10,
        //               11
        //             ],
        //             [
        //               18,
        //               12
        //             ]
        //           ]
        //         },
        //         "text-max-angle": 38,
        //         "symbol-spacing": 250,
        //         "text-font": [
        //           "DIN Offc Pro Medium",
        //           "Arial Unicode MS Regular"
        //         ],
        //         "text-padding": 2,
        //         "visibility": "visible",
        //         "text-offset": [
        //           0,
        //           0
        //         ],
        //         "text-field": "{name_zh-Hans}",
        //         "text-letter-spacing": 0.01,
        //         "text-max-width": 8
        //       },
        //       "paint": {
        //         "text-color": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               "hsl(0, 0%, 47%)"
        //             ],
        //             [
        //               9,
        //               "hsl(0, 0%, 73%)"
        //             ]
        //           ]
        //         },
        //         "text-halo-color": "#212121",
        //         "text-halo-width": 1,
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.44
        //       }
        //     },
        //     {
        //       "id": "poi-scalerank1",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444933322393.2852"
        //       },
        //       "source": "composite",
        //       "source-layer": "poi_label",
        //       "filter": [
        //         "all",
        //         [
        //           "!in",
        //           "maki",
        //           "campsite",
        //           "cemetery",
        //           "dog-park",
        //           "garden",
        //           "golf",
        //           "park",
        //           "picnic-site",
        //           "playground",
        //           "zoo"
        //         ],
        //         [
        //           "<=",
        //           "scalerank",
        //           1
        //         ]
        //       ],
        //       "layout": {
        //         "text-line-height": 1.1,
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               10,
        //               11
        //             ],
        //             [
        //               18,
        //               12
        //             ]
        //           ]
        //         },
        //         "text-max-angle": 38,
        //         "symbol-spacing": 250,
        //         "text-font": [
        //           "DIN Offc Pro Medium",
        //           "Arial Unicode MS Regular"
        //         ],
        //         "text-padding": 2,
        //         "visibility": "visible",
        //         "text-offset": [
        //           0,
        //           0
        //         ],
        //         "text-field": "{name_zh-Hans}",
        //         "text-letter-spacing": 0.01,
        //         "text-max-width": 8
        //       },
        //       "paint": {
        //         "text-color": "hsl(0, 0%, 60%)",
        //         "text-halo-color": "#212121",
        //         "text-halo-width": 1,
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.44
        //       }
        //     },
        //     {
        //       "id": "place-suburb",
        //       "type": "symbol",
        //       "source": "composite",
        //       "source-layer": "place_label",
        //       "minzoom": 11,
        //       "maxzoom": 16,
        //       "filter": [
        //         "==",
        //         "type",
        //         "suburb"
        //       ],
        //       "layout": {
        //         "text-field": "{name_zh-Hans}",
        //         "text-transform": "uppercase",
        //         "text-font": [
        //           "DIN Offc Pro Regular",
        //           "Arial Unicode MS Regular"
        //         ],
        //         "text-letter-spacing": 0.15,
        //         "text-max-width": 7,
        //         "text-padding": 3,
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               11,
        //               11
        //             ],
        //             [
        //               15,
        //               18
        //             ]
        //           ]
        //         },
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
        //         "text-halo-width": 1,
        //         "text-color": "hsl(0, 0%, 70%)",
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.38
        //       }
        //     },
        //     {
        //       "id": "place-town",
        //       "type": "symbol",
        //       "source": "composite",
        //       "source-layer": "place_label",
        //       "minzoom": 7,
        //       "maxzoom": 15,
        //       "filter": [
        //         "==",
        //         "type",
        //         "town"
        //       ],
        //       "layout": {
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               11.5
        //             ],
        //             [
        //               15,
        //               20
        //             ]
        //           ]
        //         },
        //         "text-font": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               11,
        //               [
        //                 "DIN Offc Pro Regular",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ],
        //             [
        //               12,
        //               [
        //                 "DIN Offc Pro Medium",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ]
        //           ]
        //         },
        //         "text-padding": 2,
        //         "text-offset": [
        //           0,
        //           0
        //         ],
        //         "text-field": "{name_zh-Hans}",
        //         "text-max-width": 7,
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-color": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               10,
        //               "hsl(0, 0%, 75%)"
        //             ],
        //             [
        //               11,
        //               "hsl(0, 0%, 85%)"
        //             ]
        //           ]
        //         },
        //         "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
        //         "text-halo-width": 1.25,
        //         "icon-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7.99,
        //               1
        //             ],
        //             [
        //               8,
        //               0
        //             ]
        //           ]
        //         },
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.41
        //       }
        //     },
        //     {
        //       "id": "place-city-sm",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444862510685.128"
        //       },
        //       "source": "composite",
        //       "source-layer": "place_label",
        //       "maxzoom": 14,
        //       "filter": [
        //         "all",
        //         [
        //           "!in",
        //           "scalerank",
        //           0,
        //           1,
        //           2,
        //           3,
        //           4,
        //           5
        //         ],
        //         [
        //           "==",
        //           "type",
        //           "city"
        //         ]
        //       ],
        //       "layout": {
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               6,
        //               12
        //             ],
        //             [
        //               14,
        //               22
        //             ]
        //           ]
        //         },
        //         "text-font": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               [
        //                 "DIN Offc Pro Regular",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ],
        //             [
        //               8,
        //               [
        //                 "DIN Offc Pro Medium",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ]
        //           ]
        //         },
        //         "text-offset": [
        //           0,
        //           0
        //         ],
        //         "text-field": "{name_zh-Hans}",
        //         "text-max-width": 7,
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-color": "hsl(0, 0%, 90%)",
        //         "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
        //         "text-halo-width": 1.25,
        //         "icon-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7.99,
        //               1
        //             ],
        //             [
        //               8,
        //               0
        //             ]
        //           ]
        //         },
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.41
        //       }
        //     },
        //     {
        //       "id": "place-city-md-s",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444862510685.128"
        //       },
        //       "source": "composite",
        //       "source-layer": "place_label",
        //       "maxzoom": 14,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "type",
        //           "city"
        //         ],
        //         [
        //           "in",
        //           "ldir",
        //           "E",
        //           "S",
        //           "SE",
        //           "SW"
        //         ],
        //         [
        //           "in",
        //           "scalerank",
        //           3,
        //           4,
        //           5
        //         ]
        //       ],
        //       "layout": {
        //         "text-field": "{name_zh-Hans}",
        //         "text-size": {
        //           "base": 0.9,
        //           "stops": [
        //             [
        //               5,
        //               12
        //             ],
        //             [
        //               12,
        //               22
        //             ]
        //           ]
        //         },
        //         "text-anchor": "top",
        //         "text-offset": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7.99,
        //               [
        //                 0,
        //                 0.1
        //               ]
        //             ],
        //             [
        //               8,
        //               [
        //                 0,
        //                 0
        //               ]
        //             ]
        //           ]
        //         },
        //         "text-font": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               [
        //                 "DIN Offc Pro Regular",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ],
        //             [
        //               8,
        //               [
        //                 "DIN Offc Pro Medium",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ]
        //           ]
        //         },
        //         "icon-image": "dot-10",
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-halo-width": 1,
        //         "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
        //         "text-color": "hsl(0, 0%, 90%)",
        //         "text-halo-blur": 0,
        //         "icon-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7.99,
        //               1
        //             ],
        //             [
        //               8,
        //               0
        //             ]
        //           ]
        //         },
        //         "text-opacity": 0.41
        //       }
        //     },
        //     {
        //       "id": "place-city-md-n",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444862510685.128"
        //       },
        //       "source": "composite",
        //       "source-layer": "place_label",
        //       "maxzoom": 14,
        //       "filter": [
        //         "all",
        //         [
        //           "==",
        //           "type",
        //           "city"
        //         ],
        //         [
        //           "in",
        //           "ldir",
        //           "N",
        //           "NE",
        //           "NW",
        //           "W"
        //         ],
        //         [
        //           "in",
        //           "scalerank",
        //           3,
        //           4,
        //           5
        //         ]
        //       ],
        //       "layout": {
        //         "text-size": {
        //           "base": 0.9,
        //           "stops": [
        //             [
        //               5,
        //               12
        //             ],
        //             [
        //               12,
        //               22
        //             ]
        //           ]
        //         },
        //         "text-font": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               [
        //                 "DIN Offc Pro Regular",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ],
        //             [
        //               8,
        //               [
        //                 "DIN Offc Pro Medium",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ]
        //           ]
        //         },
        //         "text-offset": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7.99,
        //               [
        //                 0,
        //                 -0.25
        //               ]
        //             ],
        //             [
        //               8,
        //               [
        //                 0,
        //                 0
        //               ]
        //             ]
        //           ]
        //         },
        //         "text-anchor": "bottom",
        //         "text-field": "{name_zh-Hans}",
        //         "text-max-width": 7,
        //         "icon-image": "dot-10",
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-color": "hsl(0, 0%, 90%)",
        //         "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
        //         "text-halo-width": 1,
        //         "icon-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7.99,
        //               1
        //             ],
        //             [
        //               8,
        //               0
        //             ]
        //           ]
        //         },
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.41
        //       }
        //     },
        //     {
        //       "id": "place-city-lg-s",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444862510685.128"
        //       },
        //       "source": "composite",
        //       "source-layer": "place_label",
        //       "minzoom": 1,
        //       "maxzoom": 14,
        //       "filter": [
        //         "all",
        //         [
        //           "<=",
        //           "scalerank",
        //           2
        //         ],
        //         [
        //           "==",
        //           "type",
        //           "city"
        //         ],
        //         [
        //           "in",
        //           "ldir",
        //           "E",
        //           "S",
        //           "SE",
        //           "SW"
        //         ]
        //       ],
        //       "layout": {
        //         "icon-image": "dot-11",
        //         "text-font": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               [
        //                 "DIN Offc Pro Regular",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ],
        //             [
        //               8,
        //               [
        //                 "DIN Offc Pro Medium",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ]
        //           ]
        //         },
        //         "text-offset": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7.99,
        //               [
        //                 0,
        //                 0.15
        //               ]
        //             ],
        //             [
        //               8,
        //               [
        //                 0,
        //                 0
        //               ]
        //             ]
        //           ]
        //         },
        //         "text-anchor": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               "top"
        //             ],
        //             [
        //               8,
        //               "center"
        //             ]
        //           ]
        //         },
        //         "text-field": "{name_zh-Hans}",
        //         "text-max-width": 7,
        //         "text-size": {
        //           "base": 0.9,
        //           "stops": [
        //             [
        //               4,
        //               12
        //             ],
        //             [
        //               10,
        //               22
        //             ]
        //           ]
        //         },
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-color": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               "hsl(0, 0%, 95%)"
        //             ],
        //             [
        //               9,
        //               "hsl(0, 0%, 90%)"
        //             ]
        //           ]
        //         },
        //         "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
        //         "text-halo-width": 1,
        //         "icon-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7.99,
        //               1
        //             ],
        //             [
        //               8,
        //               0
        //             ]
        //           ]
        //         },
        //         "text-halo-blur": 0,
        //         "text-opacity": 0.41
        //       }
        //     },
        //     {
        //       "id": "place-city-lg-n",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444862510685.128"
        //       },
        //       "source": "composite",
        //       "source-layer": "place_label",
        //       "minzoom": 1,
        //       "maxzoom": 14,
        //       "filter": [
        //         "all",
        //         [
        //           "<=",
        //           "scalerank",
        //           2
        //         ],
        //         [
        //           "==",
        //           "type",
        //           "city"
        //         ],
        //         [
        //           "in",
        //           "ldir",
        //           "N",
        //           "NE",
        //           "NW",
        //           "W"
        //         ]
        //       ],
        //       "layout": {
        //         "icon-image": "dot-11",
        //         "text-font": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               [
        //                 "DIN Offc Pro Regular",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ],
        //             [
        //               8,
        //               [
        //                 "DIN Offc Pro Medium",
        //                 "Arial Unicode MS Regular"
        //               ]
        //             ]
        //           ]
        //         },
        //         "text-offset": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7.99,
        //               [
        //                 0,
        //                 -0.25
        //               ]
        //             ],
        //             [
        //               8,
        //               [
        //                 0,
        //                 0
        //               ]
        //             ]
        //           ]
        //         },
        //         "text-anchor": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               "bottom"
        //             ],
        //             [
        //               8,
        //               "center"
        //             ]
        //           ]
        //         },
        //         "text-field": "{name_zh-Hans}",
        //         "text-max-width": 7,
        //         "text-size": {
        //           "base": 0.9,
        //           "stops": [
        //             [
        //               4,
        //               12
        //             ],
        //             [
        //               10,
        //               22
        //             ]
        //           ]
        //         },
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-color": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7,
        //               "hsl(0, 0%, 95%)"
        //             ],
        //             [
        //               9,
        //               "hsl(0, 0%, 90%)"
        //             ]
        //           ]
        //         },
        //         "text-opacity": 0.41,
        //         "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
        //         "text-halo-width": 1,
        //         "icon-opacity": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               7.99,
        //               1
        //             ],
        //             [
        //               8,
        //               0
        //             ]
        //           ]
        //         },
        //         "text-halo-blur": 0
        //       }
        //     },
        //     {
        //       "id": "state-label-sm",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444856151690.9143"
        //       },
        //       "source": "composite",
        //       "source-layer": "state_label",
        //       "minzoom": 3,
        //       "maxzoom": 9,
        //       "filter": [
        //         "<",
        //         "area",
        //         20000
        //       ],
        //       "layout": {
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               6,
        //               10
        //             ],
        //             [
        //               9,
        //               14
        //             ]
        //           ]
        //         },
        //         "text-transform": "uppercase",
        //         "text-font": [
        //           "DIN Offc Pro Bold",
        //           "Arial Unicode MS Bold"
        //         ],
        //         "text-field": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               0,
        //               "{abbr}"
        //             ],
        //             [
        //               6,
        //               "{name_zh-Hans}"
        //             ]
        //           ]
        //         },
        //         "text-letter-spacing": 0.15,
        //         "text-max-width": 5,
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-opacity": 0.47,
        //         "text-color": "hsl(0, 0%, 50%)",
        //         "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
        //         "text-halo-width": 1,
        //         "text-halo-blur": 0
        //       }
        //     },
        //     {
        //       "id": "state-label-md",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444856151690.9143"
        //       },
        //       "source": "composite",
        //       "source-layer": "state_label",
        //       "minzoom": 3,
        //       "maxzoom": 8,
        //       "filter": [
        //         "all",
        //         [
        //           "<",
        //           "area",
        //           80000
        //         ],
        //         [
        //           ">=",
        //           "area",
        //           20000
        //         ]
        //       ],
        //       "layout": {
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               5,
        //               10
        //             ],
        //             [
        //               8,
        //               16
        //             ]
        //           ]
        //         },
        //         "text-transform": "uppercase",
        //         "text-font": [
        //           "DIN Offc Pro Bold",
        //           "Arial Unicode MS Bold"
        //         ],
        //         "text-field": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               0,
        //               "{abbr}"
        //             ],
        //             [
        //               6,
        //               "{name_zh-Hans}"
        //             ]
        //           ]
        //         },
        //         "text-letter-spacing": 0.15,
        //         "text-max-width": 6,
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-opacity": 0.47,
        //         "text-color": "hsl(0, 0%, 50%)",
        //         "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
        //         "text-halo-width": 1,
        //         "text-halo-blur": 0
        //       }
        //     },
        //     {
        //       "id": "state-label-lg",
        //       "type": "symbol",
        //       "metadata": {
        //         "mapbox:group": "1444856151690.9143"
        //       },
        //       "source": "composite",
        //       "source-layer": "state_label",
        //       "minzoom": 3,
        //       "maxzoom": 7,
        //       "filter": [
        //         ">=",
        //         "area",
        //         80000
        //       ],
        //       "layout": {
        //         "text-size": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               4,
        //               10
        //             ],
        //             [
        //               7,
        //               18
        //             ]
        //           ]
        //         },
        //         "text-transform": "uppercase",
        //         "text-font": [
        //           "DIN Offc Pro Bold",
        //           "Arial Unicode MS Bold"
        //         ],
        //         "text-padding": 1,
        //         "text-field": {
        //           "base": 1,
        //           "stops": [
        //             [
        //               0,
        //               "{abbr}"
        //             ],
        //             [
        //               6,
        //               "{name_zh-Hans}"
        //             ]
        //           ]
        //         },
        //         "text-letter-spacing": 0.15,
        //         "text-max-width": 6,
        //         "visibility": "visible"
        //       },
        //       "paint": {
        //         "text-opacity": 0.47,
        //         "text-color": "hsl(0, 0%, 50%)",
        //         "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
        //         "text-halo-width": 1,
        //         "text-halo-blur": 0
        //       }
        //     }
        //   ],
        //   "created": "2017-10-07T06:07:14.679Z",
        //   "id": "cj8gx3oq81p382slblk1568at",
        //   "modified": "2017-10-07T06:41:23.304Z",
        //   "owner": "applezsp",
        //   "visibility": "private",
        //   "draft": false
        // },
        style: 'mapbox://styles/applezsp/cj8gx3oq81p382slblk1568at',
        // style: 'mapbox://styles/applezsp/cjbmx2vvw4jbd2sp13tlrbo28',
        light: {
          main: {
            intensity: 1,
            shadow: true,
            shadowQuality: 'high'
          },
          ambient: {
            intensity: 0.
          }
        }
      },
      series: [{
        type: 'lines3D',
        coordinateSystem: 'mapbox',
        polyline: true,
        animation: false,
        lineStyle: {
          normal: {
            width: 0
          }
        },
        effect: {
          constantSpeed: $scope.speed,
          show: true,
          trailLength: $scope.length,
          symbolSize: $scope.size
        },
        zlevel: 1,
        data: {
          count: function () {
            return bikeLines.length;
          },
          getItem: function (idx) {
            return bikeLines[idx]
          }
        }
      }]
    };

    myChart = echarts.init(document.getElementById("lineChart"));
    myChart.setOption(lineOption);

    $rootScope.mapbox = myChart.getModel().getComponent('mapbox').getMapbox();

    $rootScope.mapbox.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // 地图旋转
    $rootScope.mapbox.on('load', function () {
      var isRotate = true; // 地图是否旋转
      var interval; // 时间片
      var bearing = -2; // 旋转角度

      function start() {
        $rootScope.mapbox.flyTo({bearing: -900, duration: 70000, pitch: 140});
        interval = window.setInterval(function () {
          bearing = bearing - 2;
          $rootScope.mapbox.flyTo({bearing: -900, duration: 70000, pitch: 140});
        }, 7000, -1)
      }

      start();

      // 点击鼠标,控制地图旋转
      document.getElementById("lineChart").addEventListener("click", function () {
        if (isRotate == true) {
          isRotate = false;
          clearTimeout(interval);
        } else {
          isRotate = true;
          start();
        }
      });
    });
  }

  var speed = [0.1, 0.5, 0.5]; // 速度
  var length = [0.02, 0.04, 0.04]; // 拖尾长度
  var size = [0.05, 1.5, 1.5]; // 图标大小

  var index1 = Math.floor((Math.random() * speed.length));
  $scope.speed = speed[index1]; // 随机速度

  var index2 = Math.floor((Math.random() * length.length));
  $scope.length = length[index2]; // 随机拖尾长度

  var index3 = Math.floor((Math.random() * size.length));
  $scope.size = size[index3]; // 随机图标大小

  //$rootScope.mapbox.setMaxBounds(bounds); // 设置地图边界




  // 车辆状态统计
  $scope.illegallyParkedCharts = function () {
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];

    function randomData(num) {
      var value = Math.random() * 200 + 600;
      return {
        name: now.toString(),
        value: [
          now,
          Math.round(value) - num
        ]
      }
    }

    var now = +new Date() - 40 * 1000;
    var interval = 500;

    for (var i = 0; i < 8; i++) {
      now = new Date(+now + interval);
      data1.push(randomData(10));
      data2.push(randomData(200));
      data3.push(randomData(400));
      data4.push(randomData(400));
    }

    var option = {
      title: {
        text: '车辆状态统计',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 16,
          color: '#FFFFFF'
        },
        left: 'center',
        top: '-1%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#57617B'
          }
        }
      },
      legend: {
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 14,
        data: ['违停车辆', '故障车辆', '调度车辆', '非法移动'],
        right: '4%',
        textStyle: {
          fontSize: 12,
          color: '#FFFFFF'
        },
        left: 'center',
        top: '7.5%'
      },
      grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        top: '16%',
        containLabel: true
      },
      xAxis: [{
        type: 'time',
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)' //基准样式
          }
        },
        axisTick: {
          show: false //刻度是否显示
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255, 255, 255, 1)' //横列样式
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {//纵列数值字体样式
            fontSize: 12,
            color: '#FFFFFF'
          }
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false //纵列格
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255, 255, 255,0.8)' //纵列样式
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {//纵列数值字体样式
            fontSize: 12,
            color: '#FFFFFF'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255,  0)' //基准样式
          }
        }
      }],
      series: [{
        name: '故障车辆',
        type: 'line',
        smooth: true,
        symbol: 'rect',
        symbolSize: 6,
        showSymbol: true,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(56, 213, 252, 0.7)'
            }, {
              offset: 0.8,
              color: 'rgba(56, 213, 252, 0.3)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(56, 213, 252)',
            borderColor: 'rgba(219,50,51,0)',
            borderWidth: 12

          }
        },
        data: data2
      }, {
        name: '调度车辆',
        type: 'line',
        smooth: true,
        symbol: 'diamond',
        symbolSize: 6,
        showSymbol: true,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0, 124, 227, 0.7)'
            }, {
              offset: 0.8,
              color: 'rgba(0, 124, 227, 0.3)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(0, 124, 227)',
            borderColor: 'rgba(219,50,51,0)',
            borderWidth: 12
          }
        },
        data: data1
      },
        {
          name: '非法移动',
          type: 'line',
          smooth: true,
          symbol: 'triangle',
          symbolSize: 6,
          showSymbol: true,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 212, 40, 0.7)'
              }, {
                offset: 0.8,
                color: 'rgba(255, 212, 40, 0.3)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {

              color: 'rgb(255, 212, 40)',
              borderColor: 'rgba(219,50,51,0)',
              borderWidth: 12
            }
          },
          data: data4
        }, {
          name: '违停车辆',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: true,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(243, 39, 121, 0.7)'
              }, {
                offset: 0.8,
                color: 'rgba(243, 39, 121, 0.3)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(243, 39, 121)',
              borderColor: 'rgba(219,50,51,0)',
              borderWidth: 12

            }
          },
          data: data3
        }
      ]
    };

    myChart1 = echarts.init(document.getElementById('bikeStateChart'));
    myChart1.setOption(option);
    var resizeFun1 = function(){
      if(myChart1 instanceof Object){
        myChart1.resize();
      }else{
        return;
      }
    };
    window.addEventListener("resize", resizeFun1);
    window.removeEventListener("resize", resizeFun1);
    $scope.myChart1Enterval = setInterval(function () {
      data1.shift();
      data2.shift();
      data3.shift();
      data4.shift();
      now = new Date();
      data1.push(randomData(10));
      data2.push(randomData(200));
      data3.push(randomData(400));
      data4.push(randomData(400));

      myChart1.setOption({
        series: [{
          data: data2
        }, {
          data: data1
        }, {
          data: data4
        }, {
          data: data3
        }]
      });

    }, interval);
  };

  // 资金流监管
  $scope.fundStreamChart = function () {
    var y = ['押金', '充值', '消费'];
    var interval = 100;
    var now2 = new Date();

    function randomData(count, result) {
      var now1 = now2;
      now1 = new Date(+now1 - (2000 - count) * (interval));
      return {
        name: now1.toString(),
        value: [
          now1,
          result[count]
        ]
      }
    }

    //初始化数据
    function getRandomArr(type) {
      var temp1 = [];
      var temp2 = [];
      var temp3 = [];
      var data = [];

      var result1 = [5000];
      var result2 = [8000];
      var result3 = [12000];

      function checkData(param) {
        if (param[param.length - 1] < 0) {
          param.pop();
          param.push(isNegative(param[param.length - 1]));
        }
      }

      for (var i = 0; i < 2000; i++) {
        result1.push(result1[result1.length - 1] + Math.round((Math.random() - 0.5) * 200));
        checkData(result1);
        result2.push(result2[result2.length - 1] + Math.round((Math.random() - 0.5) * 200));
        checkData(result2);
        result3.push(result3[result3.length - 1] + Math.round((Math.random() - 0.5) * 200));
        checkData(result3);
        temp1.push(randomData(i, result1));
        temp2.push(randomData(i, result2));
        temp3.push(randomData(i, result3));
      }

      switch (type) {
        case 1:
          data = temp1;
          break;
        case 2:
          data = temp2;
          break;
        case 3:
          data = temp3;
          break;
      }

      return data;

    }

    var data1 = getRandomArr(1);
    var data2 = getRandomArr(2);
    var data3 = getRandomArr(3);

    var option = {
      title: {
        top: "-1%",
        text: '资金流监管',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 16,
          color: '#FFFFFF'
        },
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#FFFFFF'
          }
        }
      },
      legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 15,
        data: ['押金', '充值', '消费'],
        right: 'center',
        top: '7.5%',
        textStyle: {
          fontSize: 14,
          color: '#FFFFFF'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '14%',
        containLabel: true
      },
      xAxis: [{
        type: 'time',
        splitLine: {
          show: false
        },
        splitNumber: 6,
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255)' //横列样式
          }
        }
      }],
      yAxis: [{
        type: 'value',
        name: '单位（元）',
        axisTick: {
          show: false //纵列格
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255,0.0)' //纵列样式
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: { //纵列数值字体样式
            fontSize: 14,
            color: '#FFFFFF'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255,  0.3)' //基准样式
          }
        }
      }],
      series: [{
        name: '押金',
        type: 'line',
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        smooth: true,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: 'rgba(0, 123, 223, 0.7)'
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(69,196,255)'

          }
        },
        data: data3
      }, {
        name: '充值',
        type: 'line',
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        smooth: true,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: 'rgba(39, 190, 130, 0.7)'
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(75,251,223)'

          }
        },
        data: data2
      }, {
        name: '消费',
        type: 'line',
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        smooth: true,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: 'rgba(255, 33, 158, 0.7)'
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(255,106,253)'
          }
        },
        data: data1
      }]

    };

    myChart2 = echarts.init(document.getElementById('fundStreamChart'));
    myChart2.setOption(option);
    var resizeFun2 = function(){
      if(myChart2 instanceof Object){
        myChart2.resize();
      }else{
        return;
      }
    };
    window.addEventListener("resize", resizeFun2);
    window.removeEventListener("resize", resizeFun2);
    function flushData(param) {
      param.data.splice(0, 100);
      var tempArr = [param.data[param.data.length - 1].value[1] + Math.round((Math.random() - 0.5) * 200)];
      if (tempArr[tempArr.length - 1] < 0) {
        tempArr.pop();
        tempArr.push(isNegative(tempArr[tempArr.length - 1]));
      }
      var timeArr = [new Date(+param.data[param.data.length - 1].value[0] + interval)];
      for (var j = 0; j < 100; j++) {
        param.data.push({
          name: timeArr[timeArr.length - 1].toString(),
          value: [timeArr[timeArr.length - 1], tempArr[tempArr.length - 1]]
        });
        if (tempArr[tempArr.length - 1] < 0) {
          tempArr.pop();
          tempArr.push(isNegative(tempArr[tempArr.length - 1]));
        } else {
          tempArr.push(tempArr[tempArr.length - 1] + Math.round((Math.random() - 0.5) * 200));
        }
        timeArr.push(new Date(+timeArr[timeArr.length - 1] + interval));
      }
    }

    function isNegative(param) {
      param = Math.round(Math.random() * 100);
      return param;
    }

    $scope.myChart2Enterval = setInterval(function () {
      var series = myChart2.getOption().series;
      for (var i = 0; i < y.length; i++) {
        switch (y[i]) {
          case "押金":
            flushData(series[i]);
            break;
          case "充值":
            flushData(series[i]);
            break;
          case "消费":
            flushData(series[i]);
            break;
          default:
            break;
        }
      }

      myChart2.setOption({
        series: series
      });
    }, 2000);
  };


  // 将Date类型的时间转换成字符串类型
  Date.prototype.Format = function (fmt) {
    var obj = {
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
    };
    for (var k in obj) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (("00" + obj[k]).substr(("" + obj[k]).length)));
      }
    }
    return fmt;
  }

  // 系统活跃度
  $scope.systemActivityChart = function () {
    var option = {
      title: {
        x: 'center',
        top: '-1.5%',
        text: '系统活跃度',
        textStyle: {
          fontSize: 16,
          color: '#ffffff'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      grid: {
        left: '4%',
        containLabel: true
      },
      legend: {
        top: '7%',
        textStyle: {
          fontSize: 14,
          color: '#fff'
        },
        data: ['用户活跃度', '车辆活跃度']
      },
      radar: {
        zlevel: 0,
        z: 2,
        center: ['50%', '50%'],
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [{
        type: 'category',
        name: '时间',
        nameTextStyle: {
          align: 'left',
          color: 'rgba(255,255,255,0)'
        },
        splitNumber: 1,
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255, 255, 255,1)' //横列样式
          }
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          padding: [0, 40, 0, 0],
        },
        boundaryGap: true,
        data: (function () {
          var now = new Date();
          var res = [];
          var len = 4;
          while (len--) {
            res.unshift(now.Format("HH:mm:ss"));
            now = new Date(now - 2000);
          }
          return res;
        })()
      }

      ],
      yAxis: [{
        type: 'value',
        scale: true,
        name: '数量',
        nameGap: 10,
        nameTextStyle: {
          align: 'right',
          fontSize: '10'
        },
        max: 6000,
        min: 0,
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255, 255, 255,1)' //横列样式
          }
        },
        axisTick: {
          show: false,
        },
        splitLine: {//基准样式
          lineStyle: {
            color: 'rgba(255, 255, 255, .1)' //基准样式
          }
        },
        boundaryGap: ['0%', '0%'],
      }],
      series: [{
        name: '用户活跃度',
        type: 'bar',
        barWidth: '20',
        itemStyle: {
          normal: {
            color: '#f32779',
            borderColor: 'rgba(247,206,142,0)',
            borderWidth: 2,
            opacity: '1',
          }
        },
        data: [5154, 4428, 3456, 3200]
      },
        {
          name: '车辆活跃度',
          type: 'bar',
          barWidth: '20',
          barGap: '30%',
          barCategoryGap: '100',
          itemStyle: {
            normal: {
              color: '#ffd428',
              borderColor: 'rgba(102,218,93,0)',
              borderWidth: 0,
              opacity: '1',
              backgroundColor: 'rgba(21, 177, 211, 1)'
            }
          },
          data: [2900, 5000, 3047, 4112]
        }
      ]
    };

    myChart3 = echarts.init(document.getElementById('systemActivityChart'));
    myChart3.setOption(option);
    var resizeFun3 = function(){
      if(myChart3 instanceof Object){
        myChart3.resize();
      }else{
        return;
      }
    };
    window.addEventListener("resize", resizeFun3);
    window.removeEventListener("resize", resizeFun3);
    $scope.myChart3Interval = setInterval(function () {
      var data0 = option.series[0].data;
      var data1 = option.series[1].data;
      data0.shift();
      data0.push(Math.round(3500 + Math.random() * 2000));
      data1.shift();
      data1.push(Math.round(3500 + Math.random() * 2000));
      option.xAxis[0].data.shift();
      option.xAxis[0].data.push((new Date()).Format("HH:mm:ss"));
      myChart3.setOption(option);
    }, 2000);

  }

  // 运营方综合分析
  $scope.operationChart = function () {
    var option = {
      color: ['rgba(218, 48, 35, 0.8)', 'rgba(253,245,0, 0.8)', 'rgba(21, 177, 211, 1)'],
      title: {
        x: 'center',
        top: '-1%',
        text: '运营方综合分析',
        textStyle: {
          fontSize: 16,
          color: '#ffffff'
        }
      },
      tooltip: {},
      legend: {
        itemWidth: 16,
        itemHeight: 16,
        top: '7.5%',
        data: ['A运营方', 'B运营方', 'C运营方'],
        textStyle: {
          fontSize: 12,
          color: '#ffffff'
        }
      },
      radar: {
        shape: 'circle',
        center: ['50%', '60%'],
        // radius: '60%',
        axisLine: {
          lineStyle: {
            color: '#ffffff',
            opacity: .2
          }
        },
        splitLine: {
          lineStyle: {
            color: '#ffffff',
            opacity: .3
          }
        },
        splitArea: {
          areaStyle: {
            color: 'rgba(127,95,132,0)',
            opacity: 1,
            shadowBlur: 1
          }
        },

        name: {
          show: true,
          formatter: null,
          textStyle: {
            fontSize: 12,
            //设置颜色
            color: '#ffffff'
          }
        },
        startAngle: 135,//雷达图坐标轴旋转角度
        indicator: [
          {name: '质量分析', max: 6500},
          {name: '数量分析', max: 16000},
          {name: '营收分析', max: 30000},
          {name: '频率分析', max: 38000}
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        itemStyle: {//边框、顶点颜色
          normal: {
            //   color: 'rgb(1,180,131，0)',
            borderColor: 'rgba(255,219,49,0)',
            borderWidth: 0,
            opacity: '0',
            backgroundColor: 'rgba(21, 177, 211,0)'
          }
        },
        data: [
          {
            value: [5800, 10000, 14000, 18000],
            name: 'A运营方',
            areaStyle: {
              normal: {
                color: 'rgba(218, 48, 35, 0.8)'
              }
            },
          },
          {
            value: [4000, 14000, 12000, 15000],
            name: 'B运营方',
            areaStyle: {
              normal: {
                color: 'rgba(253,245,0, 0.8)'
              }
            },
          },
          {
            value: [3700, 6000, 25000, 30000],
            name: 'C运营方',
            areaStyle: {
              normal: {
                color: 'rgba(21, 177, 211, 1)'
              }
            },
          }
        ]
      }]

    };

    myChart4 = echarts.init(document.getElementById('operationChart'));
    myChart4.setOption(option);
    var resizeFun4 = function(){
      if(myChart4 instanceof Object){
        myChart4.resize();
      }else{
        return;
      }
      };
    window.addEventListener("resize", resizeFun4);
    window.removeEventListener("resize", resizeFun4);
    $scope.pineEcharts = setInterval(function () {
      option.radar.startAngle = ++option.radar.startAngle % 360;
        myChart4.setOption(option);
    }, 100);
  };

  // 初始化数据
  function init() {
    $http.get('json/bikeLinesMapbox.json').success(function (data) {
      bikeLines = data;
      initBikeLines(); // 单车沿路线运动图
    }).error(function (err) {
      alert("dashboardCtrl: " + err.error);
    });
    var lineChartH = document.body.clientHeight;
    $("#lineChart").attr("style", 'height:' + lineChartH);
    $scope.illegallyParkedCharts();
    $scope.fundStreamChart();
    $scope.operationChart();
    $scope.systemActivityChart();
    var lJudg = true; //
  }

  init();

  $scope.$on('$destroy', function () {//离开页面后停止轮询
    $interval.cancel($scope.pineEcharts);
    $interval.cancel($scope.myChart1Enterval);
    $interval.cancel($scope.myChart2Enterval);
    $interval.cancel($scope.myChart3Interval);
    document.onkeydown(event);
    document.onkeydown = function (event) {
      return;
    };

  });

  document.onkeydown = function (event) {
    // noinspection JSAnnotator
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 76) { // 按 L
      escJudg = true;
      reSizeEcharts();
      if (lJudg) { //show
        lJudg = false;
        IndexTan4();
        numberShow();
      } else { //hide
        lJudg = true;
        IndexTan4Ba();
        numberHide();
      }
    }
  };

}]);
