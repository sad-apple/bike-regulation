package cn.net.share.control.controller;

import cn.net.share.control.domain.Fare;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.FareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/7/28.
 */
@RestController
@RequestMapping("fares")
public class FareController {

    @Autowired
    private FareService fareService ;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getDepositList(int page, int size, Fare fare){
        return fareService.findDeposits(fare, page, size);
    }
}
