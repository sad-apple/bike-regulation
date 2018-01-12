package cn.net.share.control.controller;

import cn.net.share.control.domain.DepositRule;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.DepositRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lihao on 2017/8/1.
 */
@RestController
@RequestMapping(value = "deposit-rules")
public class DepositRulesController {
    @Autowired
    private DepositRuleService depositRuleService;

    /**
     * 分页返回押金规则列表
     * @param page
     * @param size
     * @param depositRule
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getDepositRuleList(int page, int size, DepositRule depositRule){
        return depositRuleService.getDepositRuleList(page, size, depositRule);
    }

    /**
     * 新建押金规则
     * @param depositRule
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createDepositRules(@RequestBody DepositRule depositRule){
        return depositRuleService.createDepositRule(depositRule);
    }

    /**
     * 查出一个押金规则
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.GET)
    public ResponseEntity<Message> getDepositRule(@PathVariable Long id){
        return depositRuleService.getDepositRule(id);
    }

    /**
     * 删除押金规则
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteDepositRules(@PathVariable Long id){
        return depositRuleService.deleteDepositRule(id);
    }

    /**
     * 修改押金规则
     * @param depositRule
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public ResponseEntity<Message> updateDepositRules(@RequestBody DepositRule depositRule){
        return depositRuleService.updateDepositRule(depositRule);
    }
}
