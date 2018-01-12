package cn.net.share.control.controller;

import cn.net.share.control.domain.CarStatisticsDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.CarStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by shuzhengxing on 2017/9/1.
 */
@RestController
@RequestMapping("car-statistics")
public class CarStatisticsController {

    @Autowired
    private CarStatisticsService carStatisticsService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getAllCarStatistics(CarStatisticsDetails carStatisticsDetails, int page, int size){
        return carStatisticsService.findAllCarStatistics(carStatisticsDetails, page ,size);
    }

}
