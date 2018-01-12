package cn.net.share.control.controller;

import cn.net.share.control.domain.IllegalMovingDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.IllegalMovingDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by shuzhengxing on 2017/8/26.
 */
@RestController
@RequestMapping("illegal-moving")
public class IllegalMovingController {

    @Autowired
    private IllegalMovingDetailsService illegalMovingDetailsService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getRechargeDetailsList(IllegalMovingDetails illegalMovingDetails, int page, int size){
        return illegalMovingDetailsService.findAllIllegalMovingDetails(illegalMovingDetails, page, size);
    }

}
