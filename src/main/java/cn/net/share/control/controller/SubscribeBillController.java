package cn.net.share.control.controller;

import cn.net.share.control.domain.OperationBill;
import cn.net.share.control.domain.SubscribeBill;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.SubscribeBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/7.
 */
@RestController
@RequestMapping("subscribe-bills")
public class SubscribeBillController {

    @Autowired
    private SubscribeBillService subscribeBillService;

    /**
     * 分页返回认购账单列表
     * @param page
     * @param size
     * @param subscribeBill
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getSubscribeBillList(int page, int size, SubscribeBill subscribeBill){
        return subscribeBillService.findSubscribeBills(subscribeBill, page, size);
    }

    /**
     * 认购账单导出到excel表
     * @param subscribeBill
     * @return
     */
    @RequestMapping(value ="/collection" ,method = RequestMethod.GET)
    public ResponseEntity<Message> exportExcel(SubscribeBill subscribeBill){
        return subscribeBillService.exportExcel(subscribeBill);
    }
}
