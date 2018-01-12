package cn.net.share.control.controller;

import cn.net.share.control.domain.BikeAdvertisement;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.BikeAdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by zhaochuanzhi on 2017/8/17.
 */
@RestController
@RequestMapping("bike-advertisements")
public class BikeAdvertisementController {

    @Autowired
    private BikeAdvertisementService bikeAdvertisementService;

    /**
     * 分页返回车身广告列表
     * @param page
     * @param size
     * @param bikeAdvertisement
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeAdvertisementList(int page, int size, BikeAdvertisement bikeAdvertisement){
        return bikeAdvertisementService.findBikeAdList(bikeAdvertisement, page, size);
    }


    /**
     * 返回投放广告的不同类型车的数量
     * @param foundTime
     * @return
     */
    @RequestMapping(value = "/collection", method = RequestMethod.GET)
    public ResponseEntity<Message> getTotalBikeNumber(String foundTime){
        return bikeAdvertisementService.getTotalBikeNumber(foundTime);
    }


    /**
     * 获得投诉报表的数据
     * @param complaintTime
     * @return
     */
    @RequestMapping(value = "/complaint", method = RequestMethod.GET)
    public ResponseEntity<Message> getTotalComplaintNumber(String complaintTime){
        return bikeAdvertisementService.getComplaintChart(complaintTime);
    }

}
