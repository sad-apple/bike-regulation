package cn.net.share.control.service;

import cn.net.share.control.dao.BikeIllegalParkRepository;
import cn.net.share.control.domain.BikeIllegalPark;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.aop.target.LazyInitTargetSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wangbiao on 2017/8/29.
 * 单车违停 Service
 */

@Service
public class BikeIllegalParkService {

    @Autowired
    BikeIllegalParkRepository bikeIllegalParkRepository; // 单车违停 Repository

    // 获取单车违停信息
    public ResponseEntity<Message> getDatas() {
        List<BikeIllegalPark> bikeIllegalParks = bikeIllegalParkRepository.getDatas(10);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, bikeIllegalParks), HttpStatus.OK);
    }

}