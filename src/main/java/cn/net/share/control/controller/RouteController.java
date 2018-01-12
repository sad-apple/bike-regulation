package cn.net.share.control.controller;

import cn.net.share.control.domain.GpsData;
import cn.net.share.control.domain.RouteFullLocations;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by wangbiao on 2017/7/19.
 */

@RestController
@RequestMapping(value = "routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    //保存路线
    @RequestMapping(method = RequestMethod.POST)
    public void saveRoute() {
        routeService.saveRoute();
    }

    //获取所有路线
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getRoute() {
        return routeService.getRoute();
    }

    //获取一条路线点的起点与终点坐标
    @RequestMapping(value = "/{routeId}", method = RequestMethod.GET)
    public ResponseEntity<Message> getCoordinate(@PathVariable Long routeId) {
        return routeService.getCoordinate(routeId);
    }

    //将数组点存入数据库
    @RequestMapping(value = "/points", method = RequestMethod.POST)
    public void saveData(@RequestBody RouteFullLocations data) {
        routeService.saveData(data);
    }

    //保存路书点--有方向
    @RequestMapping(value = "/rotation-data", method = RequestMethod.POST)
    public void saveRotationData(@RequestBody RouteFullLocations data) {
        routeService.saveRotationData(data);
    }

    //海量点展示
    @RequestMapping(value = "/points", method = RequestMethod.GET)
    public ResponseEntity<Message> getDatas() {
        return routeService.getDatas();
    }

    //获取路线点的所有经纬度
    @RequestMapping(value = "/route-points", method = RequestMethod.GET)
    public ResponseEntity<Message> getAllRoutePoints() {
        return routeService.getAllRoutePoints();
    }

    // 路线点json
    @RequestMapping(value = "/datas-json", method = RequestMethod.GET)
    public ResponseEntity<Message> getDatasJson() {
        return routeService.getDatasJson();
    }
}
