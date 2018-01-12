package cn.net.share.control.controller;

import cn.net.share.control.domain.DepositBill;
import cn.net.share.control.domain.FineBill;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.FineBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/7.
 */
@RestController
@RequestMapping("fine-bills")
public class FineBillController {

    @Autowired
    private FineBillService fineBillService;

    /**
     * 分页返回罚款账单列表
     * @param page
     * @param size
     * @param fineBill
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getFineBillList(int page, int size, FineBill fineBill){
        return fineBillService.findFineBills(fineBill, page, size);
    }

    /**
     * 罚款账单导出到excel表
     * @param fineBill
     * @return
     */
    @RequestMapping(value = "/collection", method = RequestMethod.GET)
    public ResponseEntity<Message> exportExcel(FineBill fineBill){
        return fineBillService.exportExcel(fineBill);
    }




}
