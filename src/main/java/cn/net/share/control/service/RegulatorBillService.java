package cn.net.share.control.service;

import cn.net.share.control.dao.RegulatorBillRepository;
import cn.net.share.control.domain.OperationBill;
import cn.net.share.control.domain.RegulatorBill;
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
 * Created by zhaochuanzhi on 2017/8/5.
 */
@Service
public class RegulatorBillService {

    @Autowired
    private RegulatorBillRepository regulatorBillRepository;

    /**
     * 分页返回政府机构账单列表
     * @param regulatorBill
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findRegulationOrgBills(RegulatorBill regulatorBill, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page regulatorBills = regulatorBillRepository.findAll(Example.of(regulatorBill, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, regulatorBills);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 返回政府机构账单
     * @param regulatorOrgBillId
     * @return
     */
    public ResponseEntity<Message> getRegulatorOrgBill(Long regulatorOrgBillId) {
       RegulatorBill regulatorBill = regulatorBillRepository.findOne(regulatorOrgBillId);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, regulatorBill), HttpStatus.OK);
    }
}
