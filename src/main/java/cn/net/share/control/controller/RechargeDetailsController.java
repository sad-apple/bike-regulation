package cn.net.share.control.controller;

import cn.net.share.control.domain.RechargeDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.RechargeDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by shuzhengxing on 2017/8/18.
 */
@RestController
@RequestMapping("recharge-details")
public class RechargeDetailsController {
    @Autowired
    private RechargeDetailsService rechargeDetailsService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getRechargeDetailsList(RechargeDetails rechargeDetails, int page, int size){
        return rechargeDetailsService.findAllRechargeDetails(rechargeDetails, page, size);
    }
}
