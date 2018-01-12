package cn.net.share.control.controller;

import cn.net.share.control.domain.BikeDispatcher;
import cn.net.share.control.domain.RegionReform;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikeDispatcherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/18.
 */
@RestController
@RequestMapping("bike-dispatchers")
public class BikeDispatcherController {

    @Autowired
    private BikeDispatcherService bikeDispatcherService;

    /**
     * 返回车辆调度明细
     * @param page
     * @param size
     * @param bikeDispatcher
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getDepositBillList(int page, int size, BikeDispatcher bikeDispatcher){
        return bikeDispatcherService.getBikeDispatcherList(bikeDispatcher, page, size);
    }
}
