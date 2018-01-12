package cn.net.share.control.controller;

import cn.net.share.control.domain.BikeAdvertisement;
import cn.net.share.control.domain.RegionReform;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.RegionReformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/18.
 */
@RestController
@RequestMapping("region-reforms")
public class RegionReformController {

    @Autowired
    private RegionReformService regionReformService;

    /**
     * 随机从数据库中取出十条数据
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getRandomData(){
        return regionReformService.getMajorAreaReformList(10);
    }

    /**
     * 随机从数据库中取出一条数据
     * @return
     */
    @RequestMapping(value = "/collection", method = RequestMethod.GET)
    public ResponseEntity<Message> getRandomDataOne() {
        return regionReformService.getMajorAreaReformList(1);
    }


}
