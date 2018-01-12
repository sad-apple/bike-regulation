package cn.net.share.control.service;

import cn.net.share.control.dao.CityPositionRepository;
import cn.net.share.control.domain.CityPosition;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wangbiao on 2017/7/14.
 */

@Service
public class CityPositionService {

    @Autowired
    private CityPositionRepository cityPositionRepository;

    //获取城市地点名称
    public ResponseEntity<Message> getCityPosition() {
        List<String> cityPositionList = cityPositionRepository.getCityPosition();
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, cityPositionList), HttpStatus.OK);
    }

    //临时代码：前台地图加载时，将地图坐标点经纬度存入数据库
    public ResponseEntity<Message> updatePosition(CityPosition cityPosition) {
        String str = new String();
        if (cityPosition.getPositionName().length() < 3) {
            str = cityPosition.getPositionName().substring(0, 2);
        } else if (cityPosition.getPositionName().length() < 4) {
            str = cityPosition.getPositionName().substring(0, 3);
        } else if (cityPosition.getPositionName().length() < 5) {
            str = cityPosition.getPositionName().substring(0, 4);
        } else if (cityPosition.getPositionName().length() < 6) {
            str = cityPosition.getPositionName().substring(0, 5);
        } else {
            str = cityPosition.getPositionName().substring(0, 6);
        }
        CityPosition cityPositions = cityPositionRepository.findPositionName(str);
        if (null != cityPositions && null == cityPositions.getLat()) {
            cityPositions.setLon(cityPosition.getLon());
            cityPositions.setLat(cityPosition.getLat());
            cityPositionRepository.save(cityPositions);
        }

        return null;
    }

    //获取城市全部地点信息
    public ResponseEntity<Message> getAllPositions() {
        List<CityPosition> cityPositionList = cityPositionRepository.findAll();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, cityPositionList), HttpStatus.OK);
    }

}
