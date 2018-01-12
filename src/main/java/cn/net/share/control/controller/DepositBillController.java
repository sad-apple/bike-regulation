package cn.net.share.control.controller;

import cn.net.share.control.domain.DepositBill;
import cn.net.share.control.domain.SubscribeBill;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.DepositBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/7.
 */
@RestController
@RequestMapping("deposit-bills")
public class DepositBillController {

    @Autowired
    private DepositBillService depositBillService;

    /**
     * 分页返回押金账单列表
     * @param page
     * @param size
     * @param depositBill
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getDepositBillList(int page, int size, DepositBill depositBill){
        return depositBillService.findDepositBills(depositBill, page, size);
    }

    /**
     * 押金账单导出到excel表
     * @param depositBill
     * @return
     */
    @RequestMapping(value = "/collection", method = RequestMethod.GET)
    public ResponseEntity<Message> exportExcel(DepositBill depositBill){
        return depositBillService.exportExcel(depositBill);
    }
}
