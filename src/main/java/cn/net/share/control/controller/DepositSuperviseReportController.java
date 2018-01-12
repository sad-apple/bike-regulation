package cn.net.share.control.controller;

import cn.net.share.control.domain.DepositSuperviseReport;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.DepositSuperviseReportService;
import org.aspectj.apache.bcel.classfile.Method;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by lihao on 2017/8/17.
 */
@RestController
@RequestMapping("deposit-supervise-report")
public class DepositSuperviseReportController {

    @Autowired
    private DepositSuperviseReportService depositSuperviseReportService;

    /**
     * 返回押金明细列表
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> depositDetails() {
        return depositSuperviseReportService.depositDetails();
    }

    /**
     * 返回一条数据
     * @return
     */
    @RequestMapping(value = "/one-record", method = RequestMethod.GET)
    public ResponseEntity<Message> random() {
        return depositSuperviseReportService.random();
    }

}
