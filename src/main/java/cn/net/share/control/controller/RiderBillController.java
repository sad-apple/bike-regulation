package cn.net.share.control.controller;

import cn.net.share.control.domain.RiderBill;
import cn.net.share.control.domain.SubscribeBill;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.RiderBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/7.
 */

@RestController
@RequestMapping("rider-bills")
public class RiderBillController {

    @Autowired
    private RiderBillService riderBillService;

    /**
     * 分页返回骑行账单列表
     * @param page
     * @param size
     * @param riderBill
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getRiderBillList(int page, int size, RiderBill riderBill){
        return riderBillService.findRiderBills(riderBill, page, size);
    }

    /**
     * 骑行账单导出到excel表
     * @param riderBill
     * @return
     */
    @RequestMapping(value = "/collection", method = RequestMethod.GET)
    public ResponseEntity<Message> exportExcel(RiderBill riderBill){
        return  riderBillService.exportExcel(riderBill);
    }

}
