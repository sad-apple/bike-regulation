package cn.net.share.control.controller;

import cn.net.share.control.domain.CarTaxSupervise;
import cn.net.share.control.domain.FreeRiderTax;
import cn.net.share.control.domain.TaxSuperviseReport;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.CarTaxSuperviseService;
import cn.net.share.control.service.FreeRiderTaxService;
import cn.net.share.control.service.TaxSuperviseReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by lihao on 2017/8/25.
 */
@RestController
@RequestMapping("free-rider-tax")
public class FreeRiderTaxController {

    @Autowired
    private FreeRiderTaxService freeRiderTaxService;

    /**
     * 返回顺风车税收明细
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> taxSuperviseDetails() {
        return freeRiderTaxService.taxSuperviseDetails();
    }

    /**
     * 返回一条数据
     * @return
     */
    @RequestMapping(value = "/one-record", method = RequestMethod.GET)
    public ResponseEntity<Message> getRecord() {
        return freeRiderTaxService.getRecord();
    }

}
