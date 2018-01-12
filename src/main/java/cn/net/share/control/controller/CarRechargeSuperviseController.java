package cn.net.share.control.controller;

import cn.net.share.control.domain.CarRechargeSupervise;
import cn.net.share.control.domain.RechargeDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.CarRechargeSuperviseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by lihao on 2017/8/25.
 */
@RestController
@RequestMapping("car-recharge-supervise")
public class CarRechargeSuperviseController {

    @Autowired
    private CarRechargeSuperviseService carRechargeSuperviseService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getRechargeDetailsList(){
        return carRechargeSuperviseService.findRechargeDetails();
    }

    @RequestMapping(value = "/one-record", method = RequestMethod.GET)
    public ResponseEntity<Message> getRecord(){
        return carRechargeSuperviseService.getRecord();
    }

}
