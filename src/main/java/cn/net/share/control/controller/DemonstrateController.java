package cn.net.share.control.controller;

import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.DemonstrateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhangshiping on 2017/8/18.
 */
@RestController
@RequestMapping("demonstrate")
public class DemonstrateController {
    @Autowired
    private DemonstrateService demonstrateService;

    /**
     * 获取单车质量统计
     * @return
     */
    @RequestMapping(value = "/bike-quality", method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeQuality() {
        return demonstrateService.getBikeQuality();
    }

    /**
     * 获取单车数量统计
     * @return
     */
    @RequestMapping(value = "/bike-quantity", method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeQuantity() {
        return demonstrateService.getBikeQuantity();
    }

    /**
     * 获取车辆调控指挥
     * @return
     */
    @RequestMapping(value = "/bike-dispatch", method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeDispatch() {
        return demonstrateService.getBikeDispatch();
    }

    /**
     * 获取历史订单结果
     * @return
     */
    @RequestMapping(value = "/rider-order", method = RequestMethod.GET)
    public ResponseEntity<Message> getRunResult() {
        return demonstrateService.getRunResult();
    }


    /**
     * 获取单车税务监管数据
     * @return
     */
    @RequestMapping(value = "/tax-supervise", method = RequestMethod.GET)
    public ResponseEntity<Message> getTaxSupervise() {
        return demonstrateService.getTaxSupervise();
    }

    /**
     * 获取单车车身广告数据
     * @return
     */
    @RequestMapping(value = "/bike-ad", method = RequestMethod.GET)
    public ResponseEntity<Message> getBikeAdSupervise() {
        return demonstrateService.getBikeAdList();
    }
}
