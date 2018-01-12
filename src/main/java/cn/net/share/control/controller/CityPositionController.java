package cn.net.share.control.controller;

import cn.net.share.control.domain.CityPosition;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.CityPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by wangbiao on 2017/7/14.
 */

@RestController
@RequestMapping(value = "city-positions")
public class CityPositionController {

    @Autowired
    private CityPositionService cityPositionService;

    /**
     * 获取城市地点名称
     *
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getCityPosition(){
        return cityPositionService.getCityPosition();
    }

    /**
     * 临时代码：前台地图加载时，将地图坐标点经纬度插入数据库
     *
     * @param cityPosition
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> updatePosition(@RequestBody CityPosition cityPosition) {
        return cityPositionService.updatePosition(cityPosition);
    }

    //获取城市全部地点信息
    @RequestMapping(value = "/collection", method = RequestMethod.GET)
    public ResponseEntity<Message> getAllPositions() {
        return cityPositionService.getAllPositions();
    }

}
