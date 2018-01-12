package cn.net.share.control.service;


import cn.net.share.control.dao.CarRechargeSuperviseRepository;
import cn.net.share.control.domain.CarRechargeSupervise;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lihao on 2017/8/25.
 */
@Service
public class CarRechargeSuperviseService {
    @Autowired
    private CarRechargeSuperviseRepository carRechargeSuperviseRepository;

    public ResponseEntity<Message> findRechargeDetails(){
        List<CarRechargeSupervise> carRechargeSupervises = carRechargeSuperviseRepository.getRandom(10);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, carRechargeSupervises), HttpStatus.OK);
    }

    public ResponseEntity<Message> getRecord(){
        List<CarRechargeSupervise> oneRecord = carRechargeSuperviseRepository.getRandom(1);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, oneRecord), HttpStatus.OK);
    }


}
