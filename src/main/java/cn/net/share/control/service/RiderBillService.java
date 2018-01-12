package cn.net.share.control.service;

import cn.net.share.control.dao.RiderBillRepository;
import cn.net.share.control.domain.RiderBill;
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
public class RiderBillService {

    @Autowired
    private RiderBillRepository riderBillRepository;

    /**
     * 分页返回骑行账单列表
     * @param riderBill
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findRiderBills(RiderBill riderBill, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page riderBills = riderBillRepository.findAll(Example.of(riderBill, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, riderBills);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 骑行账单导出到excel表
     * @param riderBill
     * @return
     */
    public ResponseEntity<Message> exportExcel(RiderBill riderBill){
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        List<RiderBill> riderBills = riderBillRepository.findAll(Example.of(riderBill, exampleMatcher));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, riderBills);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
