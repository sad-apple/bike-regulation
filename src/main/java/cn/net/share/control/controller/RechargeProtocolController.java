package cn.net.share.control.controller;

import cn.net.share.control.domain.RechargeProtocol;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.RechargeProcotolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lihao on 2017/8/3.
 */
@RestController
@RequestMapping("recharge-protocol")
public class RechargeProtocolController {
    @Autowired
    private RechargeProcotolService rechargeProcotolService;

    /**
     * 获得充值协议
     * @param id
     * @return
     */
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> getProblem(@PathVariable Long id){
        return rechargeProcotolService.getRechargeProcotol(id);
    }

    /**
     * 修改充值协议
     * @param rechargeProtocol
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> updateProblem(@RequestBody RechargeProtocol rechargeProtocol){
        return rechargeProcotolService.modifyRechargeProcotol(rechargeProtocol);
    }
}
