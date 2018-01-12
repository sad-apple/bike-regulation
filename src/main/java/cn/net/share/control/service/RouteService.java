package cn.net.share.control.service;

import cn.net.share.control.dao.*;
import cn.net.share.control.domain.*;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wangbiao on 2017/7/19.
 */

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private CityPositionRepository cityPositionRepository;

    @Autowired
    private RouteFullLocationsRepository routeFullLocationsRepository;

    //保存路线--临时代码
//    @Scheduled(fixedDelay = 2*1000)
    public void saveRoute() {
        Route newRoute = new Route();
        CityPosition startPo = cityPositionRepository.getPointsRandom(1).get(0);
        CityPosition endPo = cityPositionRepository.getPointsRandom(1).get(0);
        newRoute.setStartPoint(startPo.getPositionName());
        newRoute.setEndPoint(endPo.getPositionName());
        int count = cityPositionRepository.getCount();
        if (count < 500) {
            routeRepository.save(newRoute);
        }
    }

    //获取所有路线
    public ResponseEntity<Message> getRoute() {
        List<Route> routeList = routeRepository.findAll();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, routeList), HttpStatus.OK);
    }

    //获取一条路线点的起点与终点坐标
    public ResponseEntity<Message> getCoordinate(Long routeId) {
        Route route = routeRepository.findOne(routeId);
        CityPosition startPoint = cityPositionRepository.findPositionName(route.getStartPoint());
        CityPosition endPoint = cityPositionRepository.findPositionName(route.getEndPoint());
        Map map = new HashMap();
        map.put("rId", route.getId());
        map.put("stP", startPoint);
        map.put("enP", endPoint);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, map), HttpStatus.OK);
    }

    //将数组点存入数据库
    public void saveData(RouteFullLocations data) {
        RouteFullLocations newData = new RouteFullLocations(data);
        newData.setRouteId(data.getRouteId());
        routeFullLocationsRepository.save(newData);
    }

    //保存路书点--有方向
    public void saveRotationData(RouteFullLocations data) {
        RouteFullLocations newData = new RouteFullLocations(data);
        newData.setRouteId(2449L);
        newData.setDirection(data.getDirection());
        routeFullLocationsRepository.save(newData);
    }

    //海量点展示
    public ResponseEntity<Message> getDatas() {
        List<RouteFullLocations> dataList = routeFullLocationsRepository.findAll();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, dataList), HttpStatus.OK);
    }

    //获取路线点的所有经纬度
    public ResponseEntity<Message> getAllRoutePoints() {
        List list = new ArrayList();
        List points = routeFullLocationsRepository.findPoints();
        list.add(points);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, list), HttpStatus.OK);
    }

    // 路线点json
    public ResponseEntity<Message> getDatasJson() {
        List<BigInteger> routeIds = routeFullLocationsRepository.findRouteIds();
        List list = new ArrayList();
        for (int i = 0; i < routeIds.size(); i++) {
            List points = routeFullLocationsRepository.findPointsByRouteId(Long.parseLong(routeIds.get(i).toString()));
            list.add(points);
        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, list), HttpStatus.OK);
    }

}
