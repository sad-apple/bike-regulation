package cn.net.share.control.controller;

import cn.net.share.control.domain.FineRule;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.FineRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lihao on 2017/8/4.
 */
@RestController
@RequestMapping(value = "fine-rules")
public class FineRuleController {
    @Autowired
    private FineRuleService fineRuleService;

    /**
     * 分页返回罚金规则列表
     * @param page
     * @param size
     * @param region
     * @param createTime
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getFineRuleList(int page, int size, String region, String createTime){
        return fineRuleService.getFineRuleList(page, size, region, createTime);
    }

    /**
     * 新建罚金规则
     * @param fineRule
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createFineRule(@RequestBody FineRule fineRule){
        return fineRuleService.createFineRule(fineRule);
    }

    /**
     * 查出一个罚金规则
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.GET)
    public ResponseEntity<Message> getFineRule(@PathVariable Long id){
        return fineRuleService.getFineRule(id);
    }

    /**
     * 删除罚金规则
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteFineRules(@PathVariable Long id){
        return fineRuleService.deleteFineRule(id);
    }

    /**
     * 修改罚金规则
     * @param fineRule
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public ResponseEntity<Message> updateDepositRules(@RequestBody FineRule fineRule){
        return fineRuleService.updateFineRule(fineRule);
    }

}
