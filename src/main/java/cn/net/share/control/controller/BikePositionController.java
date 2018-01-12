package cn.net.share.control.controller;

import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikePositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by wangbiao on 2017/7/20.
 */

@RestController
@RequestMapping("bike-positions")
public class BikePositionController {

    @Autowired
    private BikePositionService bikePositionService;

    //获取活跃单车路线点数据
    @RequestMapping(value = "/active-bikes", method = RequestMethod.GET)
    public ResponseEntity<Message> getAllPosition() {
        return bikePositionService.getAllPosition();
    }

    /*
    //更新
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public ResponseEntity<Message> updatePosition() {
        return bikePositionService.updatePosition();
    }
    */

    //删除redis里数据
    @RequestMapping(value = "/redis-data", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteRedisData() {
        return bikePositionService.deleteRedisData();
    }

    //获取redis数据
    @RequestMapping(value = "/redis-data/{key}", method = RequestMethod.GET)
    public ResponseEntity<Message> getRedisData(@PathVariable Object key) {
        return bikePositionService.getRedisData(key);
    }

    //点聚合--历史单车轨迹位置
    @RequestMapping(value = "/historys", method = RequestMethod.GET)
    public ResponseEntity<Message> getBikePosition() {
        return bikePositionService.getBikePosition();
    }

    //获取非活跃单车位置
    @RequestMapping(value = "/inactive-bikes", method = RequestMethod.GET)
    public ResponseEntity<Message> getInactiveBikePo() {
        return bikePositionService.getInactiveBikePo();
    }

}
