package cn.net.share.control.controller;

import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikeParkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by wangbiao on 2017/7/19.
 * 单车停放 Controller
 */

@RestController
@RequestMapping("bike-park")
public class BikeParkController {

    @Resource
    private BikeParkService bikeParkService;

    // 生成停放单车数据
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> saveBikePark() {
        return bikeParkService.saveBikePark();
    }

    // 获取所有静止的单车
    @RequestMapping(value = "/static", method = RequestMethod.GET)
    public ResponseEntity<Message> getStaticBikes() {
        return bikeParkService.getStaticBikes();
    }

    // 生成违停地点
    @RequestMapping(value = "/position", method = RequestMethod.PUT)
    public ResponseEntity<Message> savePosition() {
        return bikeParkService.savePosition();
    }

}