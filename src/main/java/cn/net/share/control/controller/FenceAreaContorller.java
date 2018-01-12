package cn.net.share.control.controller;

import cn.net.share.control.domain.FenceArea;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.FenceAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by shuzhengxing on 2017/8/18.
 */
@RestController
@RequestMapping("fence-area")
public class FenceAreaContorller {
    @Autowired
    private FenceAreaService fenceAreaService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getAllFenceArea(){
        return fenceAreaService.findAllFenceArea();
    }
}
