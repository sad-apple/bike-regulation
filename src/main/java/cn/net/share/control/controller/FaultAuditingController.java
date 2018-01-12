package cn.net.share.control.controller;

import cn.net.share.control.domain.Verify;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.FaultAuditingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by shuzhengxing on 2017/8/8.
 */
@RestController
@RequestMapping("fault-auditing")
public class FaultAuditingController {

    @Autowired
    private FaultAuditingService faultAuditingService;

    /**
     * 分页返回故障审核列表
     * @param page
     * @param size
     * @param faultStatus
     * @param plateNumber
     * @param bikeType
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getFaultAuditingList(int page, int size, String faultStatus, String plateNumber, String time, String bikeType){
        return faultAuditingService.findByFaultAuditingPage(page, size, faultStatus, plateNumber, time, bikeType);
    }

    /**
     * 得到所有故障审核状态
     * @return
     */
    @RequestMapping(value = "fault-status", method = RequestMethod.GET)
    public ResponseEntity<Message> getAllFaultStatus(){
        return faultAuditingService.getAllFaultStatus();
    }

    /**
     * 故障审核车辆状态改为确定
     * @param id
     * @param verify
     * @return
     */
    @RequestMapping(value = "determine/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Message> determine(@PathVariable String id, @RequestBody Verify verify){
        return faultAuditingService.determineIllegal(verify);
    }

    /**
     * 故障审核车辆状态改为取消
     * @param id
     * @param verify
     * @return
     */
    @RequestMapping(value = "cancel/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Message> cancel(@PathVariable String id, @RequestBody Verify verify){
        return faultAuditingService.cancelIllegal(verify);
    }
}
