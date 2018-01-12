package cn.net.share.control.service;

import cn.net.share.control.dao.SlowTrafficSystemRepository;
import cn.net.share.control.domain.SlowTrafficSystem;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lihao on 2017/8/18.
 */
@Service
public class SlowTrafficSystemService {

    @Autowired
    private SlowTrafficSystemRepository slowTrafficSystemRepository;

    /**
     *分页返回慢性交通规则明细
     * @param page
     * @param size
     * @param slowTrafficSystem
     * @return
     */
    public ResponseEntity<Message> slowTrafficSystemDetails(int page, int size, SlowTrafficSystem slowTrafficSystem) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page taxSuperviseReportRepositoryAll = slowTrafficSystemRepository.findAll(Example.of(slowTrafficSystem, exampleMatcher), new PageRequest(page - 1, size,new Sort(Sort.Direction.ASC,"id")));

        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, taxSuperviseReportRepositoryAll), HttpStatus.OK);
    }

    /**
     *返回所有
     * @return
     */
    public ResponseEntity<Message> pointAndAmount() {
        List<SlowTrafficSystem> list= slowTrafficSystemRepository.findAllSortAmount();
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, list), HttpStatus.OK);
    }

}
