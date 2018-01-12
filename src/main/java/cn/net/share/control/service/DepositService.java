package cn.net.share.control.service;

import cn.net.share.control.dao.DepositRepository;
import cn.net.share.control.domain.Deposit;
import cn.net.share.control.domain.OperationOrgDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by ${zhaochuanzhi} on 2017/7/28.
 */
@Service
public class DepositService {

    @Autowired
    private DepositRepository depositRepository ;

    /**
     * 分页返回押金信息列表
     * @param deposit
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> findDeposits(Deposit deposit, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();

        Page<Deposit> deposits = depositRepository.findAll(Example.of(deposit ,exampleMatcher), new PageRequest(page - 1, size,new Sort(Sort.Direction.DESC, "createTime")));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, deposits);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }
}
