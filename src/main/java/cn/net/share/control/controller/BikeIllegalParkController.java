package cn.net.share.control.controller;

import cn.net.share.control.domain.BikeIllegalPark;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikeIllegalParkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by wangbiao on 2017/8/29.
 * 单车违停 Controller
 */

@RestController
@RequestMapping("bike-illegal-park")
public class BikeIllegalParkController {

    @Autowired
    BikeIllegalParkService bikeIllegalParkService; // 单车违停 Service

    // 获取单车违停信息
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getDatas() {
        return bikeIllegalParkService.getDatas();
    }

}