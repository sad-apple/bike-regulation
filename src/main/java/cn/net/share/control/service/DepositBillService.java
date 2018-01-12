package cn.net.share.control.service;

import cn.net.share.control.dao.DepositBillRepository;
import cn.net.share.control.domain.DepositBill;
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
public class DepositBillService {

    @Autowired
    private DepositBillRepository depositBillRepository;

    /**
     * 分页返回押金账单列表
     * @param depositBill
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findDepositBills(DepositBill depositBill, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page depositBills = depositBillRepository.findAll(Example.of(depositBill, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, depositBills);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 押金账单导出到excel表格
     * @param depositBill
     * @return
     */
    public ResponseEntity<Message> exportExcel(DepositBill depositBill){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        List<DepositBill> depositBills = depositBillRepository.findAll(Example.of(depositBill, exampleMatcher));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS,depositBills);
        return  new ResponseEntity<Message>(message,HttpStatus.OK);
    }



}
