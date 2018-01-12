package cn.net.share.control.controller;

import cn.net.share.control.domain.Deposit;
import cn.net.share.control.domain.OperationOrgDetails;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.DepositService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static org.apache.coyote.http11.Constants.a;

/**
 * Created by ${zhaochuanzhi} on 2017/7/28.
 */
@RestController
@RequestMapping("deposits")
public class DepositController {

    @Autowired
    private DepositService depositService;

    /**
     * 分页获得押金列表
     * @param page
     * @param size
     * @param deposit
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getDepositList(int page, int size, Deposit deposit){
        return depositService.findDeposits(deposit, page, size);
    }
}
