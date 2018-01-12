package cn.net.share.control.controller;

import cn.net.share.control.domain.DepositStatement;
import cn.net.share.control.domain.UserProtocol;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.service.DepositService;
import cn.net.share.control.service.DepositStatementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by zhaochuanzhi on 2017/8/3.
 */

@RestController
@RequestMapping("deposit-statement")
public class DepositStatementController {

    @Autowired
    private DepositStatementService depositStatementService;

    /**
     * 获得押金说明
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> getDepositStatement(@PathVariable Long id){
        return depositStatementService.getDepositStatement(id);
    }

    /**
     * 修改押金说明
     * @param depositStatement
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> updateDepositStatement(@RequestBody DepositStatement depositStatement){
        return depositStatementService.modifyDepositStatement(depositStatement);
    }
}
