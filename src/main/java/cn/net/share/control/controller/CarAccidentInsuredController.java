package cn.net.share.control.controller;

import cn.net.share.control.domain.CarAccidentInsured;
import cn.net.share.control.domain.InsuredDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.CarAccidentInsuredService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by lihao on 2017/8/26.
 */
@RestController
@RequestMapping("car-accident-insured")
public class CarAccidentInsuredController {

    @Autowired
    private CarAccidentInsuredService carAccidentInsuredService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getInsuredDetailsList(){
        return carAccidentInsuredService.findInsureDetails();
    }

    @RequestMapping(value = "/one-record", method = RequestMethod.GET)
    public ResponseEntity<Message> getRecord(){
        return carAccidentInsuredService.getRecord();
    }

}
