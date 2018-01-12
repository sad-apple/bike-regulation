package cn.net.share.control.service;

import cn.net.share.control.dao.RechargeDetailsRepository;
import cn.net.share.control.domain.RechargeDetails;
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

/**
 * Created by shuzhengxing on 2017/8/18.
 */
@Service
public class RechargeDetailsService {

    @Autowired
    private RechargeDetailsRepository rechargeDetailsRepository;

    public ResponseEntity<Message> findAllRechargeDetails(RechargeDetails rechargeDetails, int page, int size){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page rechargeDetailss = rechargeDetailsRepository.findAll(Example.of(rechargeDetails, exampleMatcher), new PageRequest(page - 1, size));
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, rechargeDetailss), HttpStatus.OK);
    }
}
