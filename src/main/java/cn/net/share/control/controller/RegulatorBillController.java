package cn.net.share.control.controller;

import cn.net.share.control.domain.RegulatorBill;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.RegulatorBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaochuanzhi on 2017/8/5.
 */
@RestController
@RequestMapping("regulator-bills")
public class RegulatorBillController {

    @Autowired
    private RegulatorBillService regulatorBillService;

    /**
     * 分页返回政府机构账单列表
     * @param page
     * @param size
     * @param regulatorBill
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getRegulatorBillList(int page, int size, RegulatorBill regulatorBill){
        return regulatorBillService.findRegulationOrgBills(regulatorBill, page, size);
    }

    /**
     * 返回政府机构账单
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> getOperationBill(@PathVariable Long id){
        return regulatorBillService.getRegulatorOrgBill(id);
    }

}
