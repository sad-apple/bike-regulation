package cn.net.share.control.service;

import cn.net.share.control.dao.InsuredDetailsRepository;
import cn.net.share.control.domain.InsuredDetails;
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
 * Created by shuzhengxing on 2017/8/18.
 */
@Service
public class InsuredDetailsService {
    @Autowired
    private InsuredDetailsRepository insuredDetailsRepository;

    public ResponseEntity<Message> findAllInsureDetails() {
        List<InsuredDetails> insuredDetailss = insuredDetailsRepository.findAll();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, insuredDetailss), HttpStatus.OK);
    }
}
