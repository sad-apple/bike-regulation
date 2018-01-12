package cn.net.share.control.controller;

import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.ShareCarPriceSuperviseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/29.
 */
@RestController
@RequestMapping("share-car-price-supervise")
public class ShareCarPriceSuperviseController {

    @Autowired
    private ShareCarPriceSuperviseService shareCarPriceSuperviseService;

    /**
     * 从数据库中随机取出数据
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getCarPriceSuperviseList(){
        return shareCarPriceSuperviseService.getShareCarPriceList(10);
    }

    /**
     * 从数据中随机取出一条数据
     * @return
     */
    @RequestMapping(value = "/collection", method = RequestMethod.GET)
    public ResponseEntity<Message> getOneRandomData() {
        return shareCarPriceSuperviseService.getShareCarPriceList(1);
    }

}
