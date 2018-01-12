package cn.net.share.control.service;

import cn.net.share.control.dao.DepositRuleRepository;
import cn.net.share.control.domain.DepositRule;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageInfo;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.LogUtil;
import cn.net.share.control.utils.state.DepositRuleStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * Created by lihao on 2017/8/1.
 */
@Service
public class DepositRuleService {

    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);

    @Autowired
    private DepositRuleRepository depositRuleRepository;

    /**
     * 分页返回押金规则列表
     * @param page
     * @param size
     * @param depositRule
     * @return
     */
    public ResponseEntity<Message> getDepositRuleList(int page, int size, DepositRule depositRule){
        LogUtil.info(logger, "DepositRuleService:getDepositRuleList, page = " + page + ", size = " + size + ", depositRule" + depositRule);
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page depositRules = depositRuleRepository.findAll(Example.of(depositRule, exampleMatcher), new PageRequest(page - 1, size,new Sort(Sort.Direction.ASC,"id")));
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, depositRules), HttpStatus.OK);
    }

    /**
     * 创建押金规则
     * @param depositRule
     * @return
     */
    @Transactional
    public ResponseEntity<Message> createDepositRule(DepositRule depositRule) {
        LogUtil.info(logger, "DepositRuleService:createDepositRule, depositRule = " + depositRule);
        if (depositRule.getDepositAmount() == null) {
            depositRule.setDepositAmount(0);
        }
        if (depositRule.getDepositStatus().equals(DepositRuleStatus.NotNeedDeposit.toString()) && depositRule.getDepositAmount() > 0) {
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.NOT_NEED_DEPOSITAMOUNT), HttpStatus.OK);
        }
        depositRule.setCreateTime(new Date());
        depositRuleRepository.save(depositRule);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 查出一个押金规则
     * @return
     */
    public ResponseEntity<Message> getDepositRule(Long id){
        LogUtil.info(logger, "DepositRuleService:getDepositRule, id = " + id);
        DepositRule depositRule = depositRuleRepository.findOne(id);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, depositRule), HttpStatus.OK);
    }

    /**
     * 删除押金规则
     * @param id
     * @return
     */
    @Transactional
    public ResponseEntity<Message> deleteDepositRule(Long id){
        LogUtil.info(logger, "DepositRuleService:deleteDepositRule, id = " + id);
        DepositRule depositRule = depositRuleRepository.findOne(id);
        depositRuleRepository.delete(depositRule);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 修改押金规则
     * @param depositRule
     * @return
     */
    public ResponseEntity<Message> updateDepositRule(DepositRule depositRule){
        LogUtil.info(logger, "DepositRuleService:updateDepositRule, depositRule = " + depositRule);
        if (depositRule.getDepositAmount() == null) {
            depositRule.setDepositAmount(0);
        }
        if (depositRule.getDepositStatus().equals(DepositRuleStatus.NotNeedDeposit.toString()) && depositRule.getDepositAmount() > 0) {
            return new ResponseEntity(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.NOT_NEED_DEPOSITAMOUNT), HttpStatus.OK);
        }
        depositRuleRepository.save(depositRule);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

}
