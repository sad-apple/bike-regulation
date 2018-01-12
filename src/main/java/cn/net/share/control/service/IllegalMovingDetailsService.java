package cn.net.share.control.service;

import cn.net.share.control.dao.IllegalMovingDetailsRepository;
import cn.net.share.control.domain.IllegalMovingDetails;
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
 * Created by shuzhengxing on 2017/8/26.
 */
@Service
public class IllegalMovingDetailsService {

    @Autowired
    private IllegalMovingDetailsRepository illegalAuditingRepository;

    public ResponseEntity<Message> findAllIllegalMovingDetails(IllegalMovingDetails illegalMovingDetails, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page illegalMovingDetailss = illegalAuditingRepository.findAll(Example.of(illegalMovingDetails, exampleMatcher), new PageRequest(page - 1, size));
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, illegalMovingDetailss), HttpStatus.OK);
    }
}
