package cn.net.share.control.service;

import cn.net.share.control.dao.OperationRuleRepository;
import cn.net.share.control.domain.OperationRule;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.LogUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by lihao on 2017/8/5.
 */
@Service
public class OperationRuleService {
    private static final Logger logger = LoggerFactory.getLogger(OperationRuleService.class);

    @Autowired
    private OperationRuleRepository operationRuleRepository;

    /**
     * 分页返回运营规则列表
     * @param page
     * @param size
     * @param region
     * @param createTime
     * @param operationOrg
     * @return
     */
    public ResponseEntity<Message> getOperationRuleList(int page, int size, String region, String createTime, String operationOrg){
        LogUtil.info(logger, "OperationRuleService:getOperationRuleList, page = " + page + ", size = " + size + ", region =" + region + ", date =" + createTime);
        if (region == null) region = "";
        if (createTime == null) createTime = "";
        if (operationOrg == null || operationOrg.equals("选择运营组织")){
            operationOrg = "";
        }
        int firstRecord = (page - 1) * size;

        List<OperationRule> operationRules = operationRuleRepository.findOperationRules(firstRecord, size, region, createTime, operationOrg);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, operationRules), HttpStatus.OK);
    }

    /**
     * 创建运营规则
     * @param operationRule
     * @return
     */
    @Transactional
    public ResponseEntity<Message> createOperationRule(OperationRule operationRule) {
        LogUtil.info(logger, "OperationRuleService:createOperationRule, operationRule = " + operationRule);
        operationRule.setCreateTime(new Date());
        operationRuleRepository.save(operationRule);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 查出一个运营规则
     * @return
     */
    public ResponseEntity<Message> getOperationRule(Long id){
        LogUtil.info(logger, "OperationRuleService:getOperationRule, id = " + id);
        OperationRule operationRule = operationRuleRepository.findOne(id);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, operationRule), HttpStatus.OK);
    }

    /**
     * 删除运营规则
     * @param id
     * @return
     */
    @Transactional
    public ResponseEntity<Message> deleteOperationRule(Long id){
        LogUtil.info(logger, "OperationRuleService:deleteOperationRule, id = " + id);
        OperationRule operationRule = operationRuleRepository.findOne(id);
        operationRule.setOperationOrgDetails(null);
        operationRuleRepository.delete(operationRule);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 修改运营规则
     * @param operationRule
     * @return
     */
    public ResponseEntity<Message> updateOperationRule(OperationRule operationRule){
        LogUtil.info(logger, "OperationRuleService:updateOperationRule, operationRule = " + operationRule);
        operationRuleRepository.save(operationRule);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }
}
