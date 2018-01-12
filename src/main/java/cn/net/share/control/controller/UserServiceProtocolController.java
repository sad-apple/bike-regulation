package cn.net.share.control.controller;

import cn.net.share.control.domain.UserServiceProtocol;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.UserServiceProcotolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lihao on 2017/8/3.
 */
@RestController
@RequestMapping("user-service-protocol")
public class UserServiceProtocolController {
    @Autowired
    private UserServiceProcotolService userServiceProcotolService;

    /**
     * 获得充值协议
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> getProblem(@PathVariable Long id){
        return userServiceProcotolService.getUserServiceProcotol(id);
    }


    /**
     * 修改充值协议
     * @param userServiceProtocol
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> updateProblem(@RequestBody UserServiceProtocol userServiceProtocol){
        return userServiceProcotolService.modifyUserServiceProcotol(userServiceProtocol);
    }
}
