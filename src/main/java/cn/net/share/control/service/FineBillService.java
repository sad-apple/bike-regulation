package cn.net.share.control.service;

import cn.net.share.control.dao.FineBillRepository;
import cn.net.share.control.domain.DepositBill;
import cn.net.share.control.domain.FineBill;
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
public class FineBillService {

    @Autowired
    private FineBillRepository fineBillRepository;

    /**
     * 分页返回罚款账单列表
     * @param fineBill
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findFineBills(FineBill fineBill, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page fineBills = fineBillRepository.findAll(Example.of(fineBill, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, fineBills);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 罚款账单导出到excel表
     * @param fineBill
     * @return
     */
    public ResponseEntity<Message> exportExcel(FineBill fineBill){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        List<FineBill> fineBills = fineBillRepository.findAll(Example.of(fineBill, exampleMatcher));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS,fineBills);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
