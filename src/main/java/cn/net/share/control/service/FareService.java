package cn.net.share.control.service;

import cn.net.share.control.dao.FareRepository;
import cn.net.share.control.domain.Deposit;
import cn.net.share.control.domain.Fare;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 * Created by ${zhaochuanzhi} on 2017/7/28.
 */
@Service
public class FareService {

    @Autowired
    private FareRepository fareRepository;

    public ResponseEntity<Message> findDeposits(Fare fare, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();

        Page<Fare> fares = fareRepository.findAll(Example.of(fare ,exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, fares);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
