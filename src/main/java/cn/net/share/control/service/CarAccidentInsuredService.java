package cn.net.share.control.service;

import cn.net.share.control.dao.CarAccidentInsuredRepository;
import cn.net.share.control.domain.CarAccidentInsured;
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
 * Created by lihao on 2017/8/26.
 */
@Service
public class CarAccidentInsuredService {
    @Autowired
    private CarAccidentInsuredRepository carAccidentInsuredRepository;

    public ResponseEntity<Message> findInsureDetails() {
        List<CarAccidentInsured> carAccidentInsureds = carAccidentInsuredRepository.getRandomData(10);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, carAccidentInsureds), HttpStatus.OK);
    }

    public ResponseEntity<Message> getRecord() {
        List<CarAccidentInsured> carAccidentInsureds = carAccidentInsuredRepository.getRandomData(1);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, carAccidentInsureds), HttpStatus.OK);
    }
}
