package cn.net.share.control.controller;

import cn.net.share.control.domain.CarPriceSupervise;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.CarPriceSuperviseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/28.
 */

@RestController
@RequestMapping("car-price-supervise")
public class CarPriceSuperviseController {

    @Autowired
    private CarPriceSuperviseService carPriceSuperviseService;

    /**
     * 随机返回数据库中的数据
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getCarPriceSuperviseList(){
        return carPriceSuperviseService.getCarPriceList(10);
    }

    /**
     * 从数据库中随机取出一条数据
     * @return
     */
    @RequestMapping(value = "/collection", method = RequestMethod.GET)
    public ResponseEntity<Message> getOneRandomData() {
        return carPriceSuperviseService.getCarPriceList(1);
    }
}
