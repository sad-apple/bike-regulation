package cn.net.share.control.controller;

import cn.net.share.control.domain.SysRole;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhangshiping on 2017/7/20.
 */
@RestController
@RequestMapping("report-stats")
public class ReportController {
    @Autowired
    ReportService reportService;

    /**
     * 用户统计
     * @param type
     * @param startDate
     * @param endDate
     * @return
     */
    @RequestMapping(value = "customer", method = RequestMethod.GET)
    public ResponseEntity<Message> statsOfCustomer(Integer type, String startDate, String endDate, Long sysRoleId){
        return reportService.statsOfCustomer(type, startDate, endDate, sysRoleId);
    }

    /**
     * 查询所有统计的用户类型
     * @return
     */
    @RequestMapping(value = "roles", method = RequestMethod.GET)
    public ResponseEntity<Message> getAllRoles(){
        return reportService.getAllRoles();
    }

    /**
     *  单车统计
     * @param type
     * @param startDate
     * @param endDate
     * @param bikeTypeId
     * @return
     */
    @RequestMapping(value = "bike", method = RequestMethod.GET)
    public ResponseEntity<Message> statsOfBike(Integer type, String startDate, String endDate, String bikeTypeId){
        return reportService.statsOfBike(type, startDate, endDate, bikeTypeId);
    }

    /**
     * 活跃用户统计
     * @return
     */
    @RequestMapping(value = "alivebike", method = RequestMethod.GET)
    public ResponseEntity<Message> statsOfAliveBike(){
        return reportService.statsOfAliveBike();
    }

    /**
     * dashboard页面统计数据
     * @return
     */
    @RequestMapping(value = "dashboard", method = RequestMethod.GET)
    public ResponseEntity<Message> statsOfAlldata(){
        return reportService.statsOfAlldata();
    }
}
