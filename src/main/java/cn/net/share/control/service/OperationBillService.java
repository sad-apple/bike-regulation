package cn.net.share.control.service;

import cn.net.share.control.dao.OperationBillRepository;
import cn.net.share.control.domain.OperationBill;
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
 * Created by zhaochuanzhi on 2017/8/4.
 */
@Service
public class OperationBillService {

    @Autowired
    private OperationBillRepository operationBillRepository;

    /**
     * 分页返回运营组织账单列表
     * @param operationBill
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findOperationOrgBills(OperationBill operationBill, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page operationOrgBills = operationBillRepository.findAll(Example.of(operationBill, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, operationOrgBills);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 返回运营组织账单
     * @param operationOrgBillId
     * @return
     */
    public ResponseEntity<Message> getOperationOrgBill(Long operationOrgBillId) {
        OperationBill operationBill = operationBillRepository.findOne(operationOrgBillId);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, operationBill), HttpStatus.OK);
    }
}
