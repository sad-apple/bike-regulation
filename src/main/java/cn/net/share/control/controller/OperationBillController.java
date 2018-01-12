package cn.net.share.control.controller;

import cn.net.share.control.domain.OperationBill;
import cn.net.share.control.domain.OperationOrgDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.OperationBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/4.
 */
@RestController
@RequestMapping("operation-bills")
public class OperationBillController {

    @Autowired
    private OperationBillService operationBillService;

    /**
     * 分页返回运营账单列表
     * @param page
     * @param size
     * @param operationBill
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getOperationBillList(int page, int size, OperationBill operationBill){
        return operationBillService.findOperationOrgBills(operationBill, page, size);
    }

    /**
     * 返回运营账单
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> getOperationBill(@PathVariable Long id){
        return operationBillService.getOperationOrgBill(id);
    }

}
