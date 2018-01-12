package cn.net.share.control.service;

import cn.net.share.control.dao.FineRuleRepository;
import cn.net.share.control.domain.FineRule;
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
 * Created by lihao on 2017/8/4.
 */
@Service
public class FineRuleService {

    private static final Logger logger = LoggerFactory.getLogger(CustomerService.class);

    @Autowired
    private FineRuleRepository fineRuleRepository;

    /**
     * 分页返回罚金规则列表
     * @param page
     * @param size
     * @param region
     * @param createTime
     * @return
     */
    public ResponseEntity<Message> getFineRuleList(int page, int size, String region, String createTime){
        LogUtil.info(logger, "FineRuleService:getFineRuleList, page = " + page + ", size = " + size + ", region =" + region + ", date =" + createTime);
        if (region == null) region = "";
        if (createTime == null) createTime = "";

        int firstRecord = (page - 1) * size;

        List<FineRule> fineRules = fineRuleRepository.findFineRuleList(firstRecord, size, region, createTime);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, fineRules), HttpStatus.OK);
    }

    /**
     * 创建罚金规则
     * @param fineRule
     * @return
     */
    @Transactional
    public ResponseEntity<Message> createFineRule(FineRule fineRule) {
        LogUtil.info(logger, "FineRuleService:createFineRule, fineRule = " + fineRule);
        fineRule.setCreateTime(new Date());
        fineRuleRepository.save(fineRule);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 查出一个罚金规则
     * @return
     */
    public ResponseEntity<Message> getFineRule(Long id){
        LogUtil.info(logger, "FineRuleService:getFineRule, id = " + id);
        FineRule fineRule = fineRuleRepository.findOne(id);
        return  new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, fineRule), HttpStatus.OK);
    }

    /**
     * 删除罚金规则
     * @param id
     * @return
     */
    @Transactional
    public ResponseEntity<Message> deleteFineRule(Long id){
        LogUtil.info(logger, "FineRuleService:deleteFineRule, id = " + id);
        FineRule fineRule = fineRuleRepository.findOne(id);
        fineRuleRepository.delete(fineRule);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 修改押金规则
     * @param fineRule
     * @return
     */
    public ResponseEntity<Message> updateFineRule(FineRule fineRule){
        LogUtil.info(logger, "FineRuleService:updateFineRule, fineRule = " + fineRule);
        fineRuleRepository.save(fineRule);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

}
