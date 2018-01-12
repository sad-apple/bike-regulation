package cn.net.share.control.service;

import cn.net.share.control.dao.*;
import cn.net.share.control.domain.*;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wangbiao on 2017/7/19.
 * 单车停放 Service
 */

@Service
public class BikeParkService {

    @Autowired
    private BikeRepository bikeRepository;

    @Autowired
    private RiderDetailsRepository riderDetailsRepository;

    @Autowired
    private CityPositionRepository cityPositionRepository;

    @Autowired
    private BikeParkRepository bikeParkRepository;

    // 生成停放单车数据 -- 随机出单车数量、骑行停放用户、停放点.为：60
    public ResponseEntity<Message> saveBikePark() {
        List<Bike> bikeList = bikeRepository.getBikesRandom(60);
        List<RiderDetails> riderDetailsList = riderDetailsRepository.getRiderRandom(60);
        List<CityPosition> cityPositionList = cityPositionRepository.getPointsRandom(60);
        for (int i = 0; i < 60; i ++) {
            BikePark bikePark = new BikePark(bikeList.get(i), riderDetailsList.get(i), cityPositionList.get(i));
            bikeParkRepository.save(bikePark);
        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    // 获取所有静止的单车
    public ResponseEntity<Message> getStaticBikes() {
        List<BikePark> bikeParkList = bikeParkRepository.findAll();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, bikeParkList), HttpStatus.OK);
    }

    // 生成违停地点
    public ResponseEntity<Message> savePosition() {
        List<BikePark> bikeParkList = bikeParkRepository.findAll();
        for (BikePark bikePark : bikeParkList) {
            CityPosition cityPosition = cityPositionRepository.findByLatAndLon(bikePark.getLat(), bikePark.getLon());
            if (null != cityPosition) {
                bikePark.setPosition(cityPosition.getPositionName());
                bikeParkRepository.save(bikePark);
            }
        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

}