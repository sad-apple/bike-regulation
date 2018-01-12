package cn.net.share.control.service;

import cn.net.share.control.dao.SubscribeBillRepository;
import cn.net.share.control.domain.OperationBill;
import cn.net.share.control.domain.SubscribeBill;
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
 * Created by zhaochuanzhi on 2017/8/7.
 */
@Service
public class SubscribeBillService {

    @Autowired
    private SubscribeBillRepository subscribeBillRepository;

    /**
     * 分页返回认购账单列表
     * @param subscribeBill
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findSubscribeBills(SubscribeBill subscribeBill, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page subscribeBills = subscribeBillRepository.findAll(Example.of(subscribeBill, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, subscribeBills);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 认购账单导出excel表格
     * @param subscribeBill
     * @return
     */
    public ResponseEntity<Message> exportExcel(SubscribeBill subscribeBill){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        List<SubscribeBill> subscribeBills = subscribeBillRepository.findAll(Example.of(subscribeBill, exampleMatcher));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, subscribeBills);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

}
