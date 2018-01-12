package cn.net.share.control.controller;

import cn.net.share.control.domain.OperationRule;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.OperationRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lihao on 2017/8/5.
 */
@RestController
@RequestMapping("operation-rules")
public class OperationRuleController {
    @Autowired
    private OperationRuleService operationRuleService;

    /**
     * 分页返回运营规则列表
     * @param page
     * @param size
     * @param region
     * @param createTime
     * @param operationOrg
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getOperationRuleList(int page, int size, String region, String createTime, String operationOrg){
        return operationRuleService.getOperationRuleList(page, size, region, createTime, operationOrg);
    }

    /**
     * 新建运营规则
     * @param operationRule
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createOperationRule(@RequestBody OperationRule operationRule){
        return operationRuleService.createOperationRule(operationRule);
    }

    /**
     * 查出一个运营规则
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.GET)
    public ResponseEntity<Message> getOperationRule(@PathVariable Long id){
        return operationRuleService.getOperationRule(id);
    }

    /**
     * 删除运营规则
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteOperationRule(@PathVariable Long id){
        return operationRuleService.deleteOperationRule(id);
    }

    /**
     * 修改运营规则
     * @param operationRule
     * @return
     */
    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public ResponseEntity<Message> updateOperationRule(@RequestBody OperationRule operationRule){
        return operationRuleService.updateOperationRule(operationRule);
    }

}
