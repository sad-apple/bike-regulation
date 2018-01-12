package cn.net.share.control.controller;

import cn.net.share.control.domain.TaxSuperviseReport;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.TaxSuperviseReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by lihao on 2017/8/17.
 */
@RestController
@RequestMapping("tax-supervise-report")
public class TaxSuperviseReportController {

    @Autowired
    private TaxSuperviseReportService taxSuperviseReportService;

    /**
     * 分页返回税收明细列表
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> taxSuperviseDetails(int page, int size, TaxSuperviseReport taxSuperviseReport) {
        return taxSuperviseReportService.taxSuperviseDetails(page, size, taxSuperviseReport);
    }

    /**
     * 返回各区域税收总额
     * @param createTime
     * @return
     */
    @RequestMapping(value = "/total-tax", method = RequestMethod.GET)
    public ResponseEntity<Message> totalTaxAndTaxOrg(String createTime) {
        return taxSuperviseReportService.totalTaxAndTaxOrg(createTime);
    }
}
