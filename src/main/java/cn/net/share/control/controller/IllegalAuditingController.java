package cn.net.share.control.controller;

import cn.net.share.control.domain.Verify;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.IllegalAuditingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by shuzhengxing on 2017/8/5.
 */
@RestController
@RequestMapping("illegal-auditing")
public class IllegalAuditingController {

    @Autowired
    private IllegalAuditingService illegalAuditingService;

    /**
     * 分页返回违停车辆审核列表
     *
     * @param page
     * @param size
     * @param faultStatus
     * @param plateNumber
     * @param bikeType
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getIllegallyParkedList(int page, int size, String faultStatus, String plateNumber, String time, String bikeType) {
        return illegalAuditingService.findByIllegallyParkedPage(page, size, faultStatus, plateNumber, time, bikeType);
    }

    /**
     * 得到所有违停审核状态
     *
     * @return
     */
    @RequestMapping(value = "fault-status", method = RequestMethod.GET)
    public ResponseEntity<Message> getAllFaultStatus() {
        return illegalAuditingService.getAllFaultStatus();
    }

    /**
     * 违停审核车辆状态改为确定
     *
     * @param id
     * @param verify
     * @return
     */
    @RequestMapping(value = "determine/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Message> determine(@PathVariable String id, @RequestBody Verify verify) {
        return illegalAuditingService.determineIllegally(verify);
    }

    /**
     * 违停审核车辆状态改为取消
     *
     * @param id
     * @param verify
     * @return
     */
    @RequestMapping(value = "cancel/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Message> cancel(@PathVariable String id, @RequestBody Verify verify) {
        return illegalAuditingService.cancelIllegally(verify);
    }
}
